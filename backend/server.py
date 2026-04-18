from fastapi import FastAPI, APIRouter, HTTPException, Depends
from fastapi.security import HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List, Optional
from datetime import datetime

from models import (
    Summit, SummitCreate, 
    GearReview, GearReviewCreate,
    GalleryPhoto, GalleryPhotoCreate,
    LoginRequest, TokenResponse, Stats
)
from auth import authenticate_admin, create_access_token, verify_token, security

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Collections
summits_collection = db.summits
gear_collection = db.gear_reviews
gallery_collection = db.gallery_photos

# Create the main app
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ============ Authentication Routes ============

@api_router.post("/auth/login", response_model=TokenResponse)
async def login(request: LoginRequest):
    if not authenticate_admin(request.username, request.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = create_access_token(data={"sub": request.username, "role": "admin"})
    return TokenResponse(access_token=access_token)


# ============ Public Routes ============

@api_router.get("/")
async def root():
    return {"message": "Average Joe Mountaineering API"}

@api_router.get("/summits", response_model=List[Summit])
async def get_summits(type: Optional[str] = None):
    query = {}
    if type:
        query["type"] = type
    summits = await summits_collection.find(query).to_list(1000)
    return summits

@api_router.get("/summits/{summit_id}", response_model=Summit)
async def get_summit(summit_id: str):
    summit = await summits_collection.find_one({"id": summit_id})
    if not summit:
        raise HTTPException(status_code=404, detail="Summit not found")
    return summit

@api_router.get("/gear", response_model=List[GearReview])
async def get_gear_reviews(category: Optional[str] = None):
    query = {}
    if category and category != "All":
        query["category"] = category
    gear = await gear_collection.find(query).to_list(1000)
    return gear

@api_router.get("/gear/{gear_id}", response_model=GearReview)
async def get_gear_review(gear_id: str):
    gear = await gear_collection.find_one({"id": gear_id})
    if not gear:
        raise HTTPException(status_code=404, detail="Gear review not found")
    return gear

@api_router.get("/gallery", response_model=List[GalleryPhoto])
async def get_gallery_photos():
    photos = await gallery_collection.find().to_list(1000)
    return photos

@api_router.get("/stats", response_model=Stats)
async def get_stats():
    past_count = await summits_collection.count_documents({"type": "past"})
    planned_count = await summits_collection.count_documents({"type": "planned"})
    dream_count = await summits_collection.count_documents({"type": "dream"})
    
    # Calculate total elevation from past summits
    past_summits = await summits_collection.find({"type": "past"}).to_list(1000)
    total_elevation = sum(s.get("elevation", 0) for s in past_summits)
    
    return Stats(
        totalSummits=past_count,
        totalElevation=total_elevation,
        plannedPeaks=planned_count,
        dreamPeaks=dream_count
    )


# ============ Admin Routes (Protected) ============

# Summit Admin Routes
@api_router.post("/summits", response_model=Summit)
async def create_summit(summit: SummitCreate, credentials: HTTPAuthorizationCredentials = Depends(security)):
    verify_token(credentials)
    summit_dict = summit.dict()
    summit_obj = Summit(**summit_dict)
    await summits_collection.insert_one(summit_obj.dict())
    return summit_obj

@api_router.put("/summits/{summit_id}", response_model=Summit)
async def update_summit(summit_id: str, summit: SummitCreate, credentials: HTTPAuthorizationCredentials = Depends(security)):
    verify_token(credentials)
    existing = await summits_collection.find_one({"id": summit_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Summit not found")
    
    summit_dict = summit.dict()
    summit_dict["updated_at"] = datetime.utcnow()
    summit_dict["id"] = summit_id
    summit_dict["created_at"] = existing["created_at"]
    
    await summits_collection.replace_one({"id": summit_id}, summit_dict)
    return Summit(**summit_dict)

@api_router.delete("/summits/{summit_id}")
async def delete_summit(summit_id: str, credentials: HTTPAuthorizationCredentials = Depends(security)):
    verify_token(credentials)
    result = await summits_collection.delete_one({"id": summit_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Summit not found")
    return {"message": "Summit deleted successfully"}


# Gear Admin Routes
@api_router.post("/gear", response_model=GearReview)
async def create_gear_review(gear: GearReviewCreate, credentials: HTTPAuthorizationCredentials = Depends(security)):
    verify_token(credentials)
    gear_dict = gear.dict()
    gear_obj = GearReview(**gear_dict)
    await gear_collection.insert_one(gear_obj.dict())
    return gear_obj

@api_router.put("/gear/{gear_id}", response_model=GearReview)
async def update_gear_review(gear_id: str, gear: GearReviewCreate, credentials: HTTPAuthorizationCredentials = Depends(security)):
    verify_token(credentials)
    existing = await gear_collection.find_one({"id": gear_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Gear review not found")
    
    gear_dict = gear.dict()
    gear_dict["updated_at"] = datetime.utcnow()
    gear_dict["id"] = gear_id
    gear_dict["created_at"] = existing["created_at"]
    
    await gear_collection.replace_one({"id": gear_id}, gear_dict)
    return GearReview(**gear_dict)

@api_router.delete("/gear/{gear_id}")
async def delete_gear_review(gear_id: str, credentials: HTTPAuthorizationCredentials = Depends(security)):
    verify_token(credentials)
    result = await gear_collection.delete_one({"id": gear_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Gear review not found")
    return {"message": "Gear review deleted successfully"}


# Gallery Admin Routes
@api_router.post("/gallery", response_model=GalleryPhoto)
async def create_gallery_photo(photo: GalleryPhotoCreate, credentials: HTTPAuthorizationCredentials = Depends(security)):
    verify_token(credentials)
    photo_dict = photo.dict()
    photo_obj = GalleryPhoto(**photo_dict)
    await gallery_collection.insert_one(photo_obj.dict())
    return photo_obj

@api_router.put("/gallery/{photo_id}", response_model=GalleryPhoto)
async def update_gallery_photo(photo_id: str, photo: GalleryPhotoCreate, credentials: HTTPAuthorizationCredentials = Depends(security)):
    verify_token(credentials)
    existing = await gallery_collection.find_one({"id": photo_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Gallery photo not found")
    
    photo_dict = photo.dict()
    photo_dict["updated_at"] = datetime.utcnow()
    photo_dict["id"] = photo_id
    photo_dict["created_at"] = existing["created_at"]
    
    await gallery_collection.replace_one({"id": photo_id}, photo_dict)
    return GalleryPhoto(**photo_dict)

@api_router.delete("/gallery/{photo_id}")
async def delete_gallery_photo(photo_id: str, credentials: HTTPAuthorizationCredentials = Depends(security)):
    verify_token(credentials)
    result = await gallery_collection.delete_one({"id": photo_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Gallery photo not found")
    return {"message": "Gallery photo deleted successfully"}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid

class SummitBase(BaseModel):
    name: str
    elevation: int
    location: str
    difficulty: str
    image: str
    coords: List[float]
    type: str  # "past", "planned", "dream"

class SummitCreate(SummitBase):
    date: Optional[str] = None
    story: Optional[str] = None
    description: Optional[str] = None
    photos: List[str] = []

class Summit(SummitCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        from_attributes = True

class GearReviewBase(BaseModel):
    name: str
    category: str
    rating: int
    review: str
    price: float
    image: str

class GearReviewCreate(GearReviewBase):
    pros: List[str] = []
    cons: List[str] = []

class GearReview(GearReviewCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        from_attributes = True

class GalleryPhotoBase(BaseModel):
    src: str
    summit: str
    caption: str

class GalleryPhotoCreate(GalleryPhotoBase):
    pass

class GalleryPhoto(GalleryPhotoCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        from_attributes = True

class LoginRequest(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

class Stats(BaseModel):
    totalSummits: int
    totalElevation: int
    plannedPeaks: int
    dreamPeaks: int

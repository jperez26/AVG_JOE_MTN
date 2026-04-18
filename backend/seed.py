import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv('/app/backend/.env')

mongo_url = os.environ['MONGO_URL']
db_name = os.environ['DB_NAME']

# Mock data from frontend
summits_data = [
    # Past summits
    {
        "id": "hood",
        "name": "Mt. Hood",
        "elevation": 11249,
        "location": "Oregon, USA",
        "date": "2024-08-15",
        "difficulty": "Intermediate",
        "story": "My first major summit! The climb up Mt. Hood tested my endurance and willpower. Starting at 1 AM, we navigated the Pearly Gates in the dark, using headlamps and crampons. The sunrise at the summit was absolutely breathtaking - watching the shadow of the mountain stretch across the landscape below. The wind was fierce at the top, but the sense of accomplishment was worth every frozen moment.",
        "image": "https://images.unsplash.com/photo-1755643841166-00854b3961fe",
        "coords": [45.3736, -121.6960],
        "photos": [
            "https://images.unsplash.com/photo-1755643841166-00854b3961fe",
            "https://images.unsplash.com/photo-1559189975-db284c1d94d5",
            "https://images.unsplash.com/photo-1745780898016-cd73238ef78e"
        ],
        "type": "past"
    },
    {
        "id": "washington",
        "name": "Mt. Washington",
        "elevation": 6288,
        "location": "New Hampshire, USA",
        "date": "2024-09-22",
        "difficulty": "Moderate",
        "story": "Known for having the worst weather in the world, Mt. Washington lived up to its reputation. We faced 60mph winds and near-freezing temperatures even in September. The Tuckerman Ravine trail was challenging but rewarding. The alpine environment and weather observatory at the summit made this climb unique and educational.",
        "image": "https://images.unsplash.com/photo-1745780898016-cd73238ef78e",
        "coords": [44.2706, -71.3033],
        "photos": [
            "https://images.unsplash.com/photo-1745780898016-cd73238ef78e",
            "https://images.unsplash.com/photo-1755643841166-00854b3961fe",
            "https://images.unsplash.com/photo-1559189975-db284c1d94d5"
        ],
        "type": "past"
    },
    # Planned summits
    {
        "id": "shasta",
        "name": "Mt. Shasta",
        "elevation": 14179,
        "location": "California, USA",
        "date": "2025-07-15",
        "difficulty": "Intermediate",
        "description": "A dormant volcano and iconic California peak. Planning to climb via Avalanche Gulch route.",
        "image": "https://images.unsplash.com/photo-1602130707301-2f09f9d68179",
        "coords": [41.4093, -122.1949],
        "photos": [],
        "type": "planned"
    },
    {
        "id": "baker",
        "name": "Mt. Baker",
        "elevation": 10781,
        "location": "Washington, USA",
        "date": "2025-09-10",
        "difficulty": "Intermediate",
        "description": "Heavily glaciated volcano with stunning ice formations. Targeting the Coleman-Deming route.",
        "image": "https://images.unsplash.com/photo-1693324646233-8c9772e90e88",
        "coords": [48.7767, -121.8144],
        "photos": [],
        "type": "planned"
    },
    {
        "id": "rainier",
        "name": "Mt. Rainier",
        "elevation": 14411,
        "location": "Washington, USA",
        "date": "2027-08-01",
        "difficulty": "Advanced",
        "description": "The ultimate Pacific Northwest challenge. Technical glaciated climb with significant elevation gain.",
        "image": "https://images.unsplash.com/photo-1632758130486-36f6c4994f83",
        "coords": [46.8523, -121.7603],
        "photos": [],
        "type": "planned"
    },
    {
        "id": "huayna",
        "name": "Huayna Potosí",
        "elevation": 19974,
        "location": "Bolivia",
        "date": "2027-01-15",
        "difficulty": "Advanced",
        "description": "Part of the Bolivian Triple Crown. High altitude acclimatization challenge.",
        "image": "https://images.unsplash.com/photo-1667398098408-9d3b827c278c",
        "coords": [-16.2667, -68.1500],
        "photos": [],
        "type": "planned"
    },
    {
        "id": "illimani",
        "name": "Illimani",
        "elevation": 21122,
        "location": "Bolivia",
        "date": "2027-01-22",
        "difficulty": "Advanced",
        "description": "Second peak of the Bolivian Triple Crown. Technical climbing at extreme altitude.",
        "image": "https://images.unsplash.com/photo-1712183102279-321f6fd304a5",
        "coords": [-16.6333, -67.7833],
        "photos": [],
        "type": "planned"
    },
    {
        "id": "alpamayo",
        "name": "Pequeño Alpamayo",
        "elevation": 17749,
        "location": "Bolivia",
        "date": "2027-01-29",
        "difficulty": "Advanced",
        "description": "Final peak of the Bolivian Triple Crown. Stunning ice and rock climbing.",
        "image": "https://images.unsplash.com/photo-1592345570588-95104ccbc3d6",
        "coords": [-16.0167, -68.3500],
        "photos": [],
        "type": "planned"
    },
    # Dream summits
    {
        "id": "anapurna",
        "name": "Annapurna I",
        "elevation": 26545,
        "location": "Nepal",
        "difficulty": "Expert",
        "description": "The ultimate goal. One of the most dangerous 8000m peaks with the highest fatality rate.",
        "image": "https://images.unsplash.com/photo-1617395547071-98efcee72011",
        "coords": [28.5960, 83.8203],
        "photos": [],
        "type": "dream"
    },
    {
        "id": "denali",
        "name": "Denali",
        "elevation": 20310,
        "location": "Alaska, USA",
        "difficulty": "Expert",
        "description": "North America's highest peak. Extreme cold, altitude, and weather make this a true test of mountaineering skill.",
        "image": "https://images.unsplash.com/photo-1704746375215-1c9234a6d5bb",
        "coords": [63.0695, -151.0074],
        "photos": [],
        "type": "dream"
    },
    {
        "id": "matterhorn",
        "name": "Matterhorn",
        "elevation": 14692,
        "location": "Switzerland/Italy",
        "difficulty": "Expert",
        "description": "The iconic pyramid peak of the Alps. Technical rock climbing with significant exposure and objective hazards.",
        "image": "https://images.unsplash.com/photo-1710762635062-13bd1259cd18",
        "coords": [45.9763, 7.6586],
        "photos": [],
        "type": "dream"
    },
    {
        "id": "aconcagua",
        "name": "Aconcagua",
        "elevation": 22837,
        "location": "Argentina",
        "difficulty": "Advanced",
        "description": "Highest peak in South America. Non-technical but extreme altitude challenge.",
        "image": "https://images.unsplash.com/photo-1721614146624-7a6252b92754",
        "coords": [-32.6532, -70.0109],
        "photos": [],
        "type": "dream"
    },
    {
        "id": "k2",
        "name": "K2",
        "elevation": 28251,
        "location": "Pakistan/China",
        "difficulty": "Expert",
        "description": "The Savage Mountain. Second highest peak in the world and arguably the most difficult.",
        "image": "https://images.unsplash.com/photo-1704746375211-e7c88ab4ad0d",
        "coords": [35.8825, 76.5133],
        "photos": [],
        "type": "dream"
    },
    {
        "id": "nanga-parbat",
        "name": "Nanga Parbat",
        "elevation": 26660,
        "location": "Pakistan",
        "difficulty": "Expert",
        "description": "The Killer Mountain. Ninth highest peak with one of the most dramatic vertical reliefs.",
        "image": "https://images.unsplash.com/photo-1710762634710-a943bc712cc6",
        "coords": [35.2372, 74.5894],
        "photos": [],
        "type": "dream"
    }
]

gear_data = [
    {
        "id": "1",
        "name": "Black Diamond Raven Ice Axe",
        "category": "Climbing Gear",
        "rating": 9,
        "review": "Solid, reliable ice axe perfect for general mountaineering. Used it on both Hood and Washington with excellent performance. The pick holds well in various snow conditions.",
        "price": 89.95,
        "image": "https://images.unsplash.com/photo-1755643841166-00854b3961fe",
        "pros": ["Durable construction", "Great grip", "Perfect length"],
        "cons": ["Slightly heavy for technical climbing"]
    },
    {
        "id": "2",
        "name": "La Sportiva Nepal Evo GTX",
        "category": "Footwear",
        "rating": 10,
        "review": "Best mountaineering boots I've ever owned. Waterproof, warm, and compatible with automatic crampons. Broke in quickly and no blisters even on long approaches.",
        "price": 599.00,
        "image": "https://images.unsplash.com/photo-1559189975-db284c1d94d5",
        "pros": ["Excellent warmth", "Great ankle support", "Waterproof"],
        "cons": ["Expensive", "Heavy for backpacking"]
    },
    {
        "id": "3",
        "name": "Petzl Meteor Helmet",
        "category": "Safety",
        "rating": 8,
        "review": "Lightweight and comfortable for all-day wear. Good ventilation. Provides solid protection without feeling bulky.",
        "price": 89.95,
        "image": "https://images.unsplash.com/photo-1745780898016-cd73238ef78e",
        "pros": ["Lightweight", "Comfortable", "Good ventilation"],
        "cons": ["Adjustment system could be better"]
    }
]

gallery_data = [
    {"id": "1", "src": "https://images.unsplash.com/photo-1755643841166-00854b3961fe", "summit": "Mt. Hood", "caption": "Sunrise at 11,249 feet"},
    {"id": "2", "src": "https://images.unsplash.com/photo-1559189975-db284c1d94d5", "summit": "Mt. Hood", "caption": "Summit victory above the clouds"},
    {"id": "3", "src": "https://images.unsplash.com/photo-1745780898016-cd73238ef78e", "summit": "Mt. Washington", "caption": "Winter conditions on Mt. Washington"},
    {"id": "4", "src": "https://images.unsplash.com/photo-1602130707301-2f09f9d68179", "summit": "Mt. Shasta", "caption": "Mt. Shasta from the approach"},
    {"id": "5", "src": "https://images.unsplash.com/photo-1693324646233-8c9772e90e88", "summit": "Mt. Baker", "caption": "Glaciated beauty of Mt. Baker"}
]

async def seed_database():
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    # Clear existing data
    await db.summits.delete_many({})
    await db.gear_reviews.delete_many({})
    await db.gallery_photos.delete_many({})
    
    # Insert summits
    if summits_data:
        await db.summits.insert_many(summits_data)
        print(f"✅ Inserted {len(summits_data)} summits")
    
    # Insert gear reviews
    if gear_data:
        await db.gear_reviews.insert_many(gear_data)
        print(f"✅ Inserted {len(gear_data)} gear reviews")
    
    # Insert gallery photos
    if gallery_data:
        await db.gallery_photos.insert_many(gallery_data)
        print(f"✅ Inserted {len(gallery_data)} gallery photos")
    
    client.close()
    print("✅ Database seeded successfully!")

if __name__ == "__main__":
    asyncio.run(seed_database())

# API Contracts & Backend Integration Plan

## Overview
Backend will provide full CRUD operations for summits, gear reviews, and gallery photos with admin authentication.

## Authentication
- **Admin Login**: POST `/api/auth/login` - username/password → JWT token
- **Token Verification**: Middleware to protect admin routes
- Simple single-admin system (no registration needed)

## Data Models

### Summit
```python
{
    "id": str (auto-generated),
    "name": str,
    "elevation": int,
    "location": str,
    "date": datetime (optional for dreams),
    "difficulty": str,
    "story": str (optional, for past summits),
    "description": str (optional, for planned/dreams),
    "image": str (URL),
    "coords": [float, float],
    "photos": [str] (array of URLs),
    "type": "past" | "planned" | "dream",
    "created_at": datetime,
    "updated_at": datetime
}
```

### GearReview
```python
{
    "id": str (auto-generated),
    "name": str,
    "category": str,
    "rating": int (1-10),
    "review": str,
    "price": float,
    "image": str (URL),
    "pros": [str],
    "cons": [str],
    "created_at": datetime,
    "updated_at": datetime
}
```

### GalleryPhoto
```python
{
    "id": str (auto-generated),
    "src": str (URL),
    "summit": str,
    "caption": str,
    "created_at": datetime,
    "updated_at": datetime
}
```

## API Endpoints

### Public Endpoints (No Auth Required)
- GET `/api/summits` - Get all summits (with type filter: ?type=past|planned|dream)
- GET `/api/summits/{id}` - Get single summit
- GET `/api/gear` - Get all gear reviews (with category filter: ?category=...)
- GET `/api/gear/{id}` - Get single gear review
- GET `/api/gallery` - Get all gallery photos
- GET `/api/stats` - Get statistics

### Admin Endpoints (Auth Required)
- POST `/api/auth/login` - Admin login
- POST `/api/summits` - Create summit
- PUT `/api/summits/{id}` - Update summit
- DELETE `/api/summits/{id}` - Delete summit
- POST `/api/gear` - Create gear review
- PUT `/api/gear/{id}` - Update gear review
- DELETE `/api/gear/{id}` - Delete gear review
- POST `/api/gallery` - Create gallery photo
- PUT `/api/gallery/{id}` - Update gallery photo
- DELETE `/api/gallery/{id}` - Delete gallery photo

## Frontend Integration

### Remove Mock Data
- Replace `mock.js` imports with API calls
- Create `api.js` service file with axios calls
- Add loading states and error handling

### Admin Panel Routes
- `/admin` - Login page (public)
- `/admin/dashboard` - Admin dashboard (protected)
- `/admin/summits` - Manage summits (protected)
- `/admin/gear` - Manage gear reviews (protected)
- `/admin/gallery` - Manage gallery photos (protected)

### Auth Context
- Create `AuthContext` to manage admin authentication state
- Store JWT in localStorage
- Add protected route wrapper component

## Implementation Steps
1. Create MongoDB models
2. Implement authentication with JWT
3. Create CRUD endpoints for each resource
4. Add admin middleware
5. Create frontend API service
6. Build admin panel components
7. Integrate API calls in public pages
8. Remove mock data

## Admin Credentials (Initial Setup)
- Username: `admin`
- Password: Will be set via environment variable `ADMIN_PASSWORD`

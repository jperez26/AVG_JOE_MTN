# 🚀 FREE Deployment Guide - Average Joe Mountaineering

## ✅ 100% FREE Stack (No Credit Card Required)

| Component | Service | Cost | Notes |
|-----------|---------|------|-------|
| **Backend** | Render.com | FREE (5k hours/month) | Python/Flask friendly |
| **Frontend** | Vercel | FREE | Auto-deploys from GitHub |
| **Database** | MongoDB Atlas | FREE (M0 cluster) | 512MB storage |
| **Total** | | **$0/month** | Forever free tier |

---

## 📋 Prerequisites

- GitHub account (free)
- MongoDB Atlas account (free)
- Render account (free)
- Vercel account (free)

---

## 🔧 Step 1: Set Up MongoDB (Database)

### 1.1 Create MongoDB Atlas Account
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Register" and create a free account
3. Create a new organization and project

### 1.2 Create Free M0 Cluster
1. Click "Create Deployment"
2. Select **M0 (Free)** cluster
3. Choose your region (pick closest to you)
4. Click "Create Deployment"
5. Wait 5-10 minutes for cluster to be ready

### 1.3 Create Database User
1. Go to "Database Access" → "Add New Database User"
2. Create username: `admin`
3. Create password: (save this!)
4. Select "Built-in Role" → "Atlas Admin"
5. Click "Add User"

### 1.4 Whitelist Your IP
1. Go to "Network Access"
2. Click "Add IP Address"
3. Select "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### 1.5 Get Connection String
1. Click "Drivers" button
2. Copy the connection string
3. Replace `<password>` with your actual password
4. It should look like: `mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

**Save this - you'll need it!**

---

## 🎯 Step 2: Deploy Backend to Render (FREE)

### 2.1 Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub (recommended)
3. Click "New +" → "Web Service"
4. Select "Deploy an existing repository"
5. Connect your GitHub account and select `jperez26/AVG_JOE_MTN`

### 2.2 Configure Web Service
Fill in these settings:

| Setting | Value |
|---------|-------|
| **Name** | `avg-joe-backend` |
| **Runtime** | `Python 3` |
| **Build Command** | `cd backend && pip install -r requirements.txt` |
| **Start Command** | `cd backend && gunicorn -w 4 -k uvicorn.workers.UvicornWorker app:app` |
| **Instance Type** | `Free` |
| **Branch** | `clean-production` |

### 2.3 Add Environment Variables
Click "Environment" and add:

```
MONGO_URL=mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
DB_NAME=avg_joe_mtn
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password_here
JWT_SECRET=your_random_secret_key_min_32_chars
```

⚠️ **IMPORTANT:**
- Replace `YOUR_PASSWORD` with your MongoDB password
- Create a secure `ADMIN_PASSWORD` (min 12 characters)
- Generate `JWT_SECRET`: Use any random string (32+ characters recommended)

### 2.4 Deploy
1. Click "Deploy Web Service"
2. Wait for build (3-5 minutes)
3. Once deployed, you'll get a URL like: `https://avg-joe-backend.onrender.com`
4. **Save this URL!**

### 2.5 Test Backend
Visit: `https://your-backend-url.onrender.com/api/` - Should see JSON response

---

## 🎨 Step 3: Deploy Frontend to Vercel (FREE)

### 3.1 Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Select your `jperez26/AVG_JOE_MTN` repo
5. Click "Import"

### 3.2 Configure Project
Set these in the configuration:

| Setting | Value |
|---------|-------|
| **Framework** | `Create React App` |
| **Root Directory** | `frontend` |
| **Build Command** | `npm run build` |
| **Output Directory** | `build` |

### 3.3 Add Environment Variables
Click "Environment Variables" and add:

```
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
```

Replace with your actual Render backend URL from Step 2.4

### 3.4 Deploy
1. Click "Deploy"
2. Wait for build (2-3 minutes)
3. You'll get a URL like: `https://avg-joe-mtn.vercel.app`

---

## ✨ Step 4: Verify Everything Works

### 4.1 Test Login
1. Go to your frontend URL
2. Click "Admin" or navigate to `/admin`
3. Login with:
   - Username: `admin`
   - Password: (whatever you set in `ADMIN_PASSWORD`)

### 4.2 Test Backend API
Visit in browser:
```
https://your-backend-url.onrender.com/api/summits
https://your-backend-url.onrender.com/api/gear
https://your-backend-url.onrender.com/api/gallery
```

Should return empty arrays `[]` (no data yet)

---

## 📝 Step 5: Seed Initial Data

### 5.1 Local Setup (One-time)
```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Edit .env with your MongoDB URL and admin credentials

# Run seed script
python seed.py
```

This will populate your database with sample summits, gear reviews, and photos.

---

## 🚀 Making Updates & Changes

### For Backend Changes
```bash
# Make your code changes
git add backend/
git commit -m "Backend: description of changes"
git push origin clean-production

# Render auto-deploys within 1-2 minutes
```

### For Frontend Changes
```bash
# Make your code changes
git add frontend/
git commit -m "Frontend: description of changes"
git push origin clean-production

# Vercel auto-deploys within 1-2 minutes
```

---

## 💡 Pro Tips

### Free Tier Limits (Render)
- **5,000 hours/month** (enough for ~20 days continuous)
- **256 MB RAM** (plenty for a small app)
- **Web service goes to sleep** after 15 minutes of inactivity (5 seconds to wake)

### Optimize for Free Tier
- Keep database queries efficient
- Use caching where possible
- Monitor logs at render.com dashboard

### Custom Domain (Optional, FREE)
Render allows free custom domains with their subdomain (e.g., `avg-joe.render.com`)

---

## 🆘 Troubleshooting

### Backend says "Application failed to load"
- Check environment variables are set
- Check MongoDB connection string is correct
- View logs in Render dashboard

### Frontend can't connect to backend
- Verify `REACT_APP_API_URL` is correct in Vercel
- Check CORS is enabled in backend
- Frontend must rebuild after env var change

### MongoDB connection timeout
- Check whitelist includes 0.0.0.0/0
- Verify password in connection string (special chars need URL encoding)
- Test connection locally first

---

## 📊 Monitoring

### Render Dashboard
- View logs: https://dashboard.render.com
- Monitor CPU/memory usage
- Check deployment history

### Vercel Dashboard
- View deployment logs: https://vercel.com/dashboard
- Check analytics
- View environment variables

---

## 🎉 You're Live!

Your site is now:
- ✅ Fully hosted for FREE
- ✅ Auto-deployed from GitHub
- ✅ Scalable (upgrade anytime)
- ✅ Your code, your control

**Total setup time: ~20 minutes**
**Cost: $0/month forever**

---

## Next Steps

1. ✅ Deploy backend to Render
2. ✅ Deploy frontend to Vercel
3. ✅ Seed database with data
4. ✅ Test login and functionality
5. 📝 Build admin pages for managing content
6. 🎨 Customize styling/branding
7. 📱 Add more features!

---

*No credit card required. No Emergent. No vendor lock-in. 100% yours.*

# 🌟 Suryoday Education — Full Stack Website

**Education For Bright Future | Mota Varachha, Surat**

---

## 📁 Project Structure

```
suryoday-education/
├── frontend/
│   └── index.html          ← Complete website (all 5 pages)
└── backend/
    ├── server.js            ← Node.js + Express API
    ├── package.json
    ├── .env.example         ← Copy to .env and fill values
    └── .gitignore
```

---

## ✨ Features

- **5 Pages:** Home, About, Courses, Results, Contact
- **GSAP Animations:** Hero, scroll reveals, counters
- **Glassmorphism dark UI** with gold theme from logo
- **Fully responsive** (mobile, tablet, desktop)
- **WhatsApp floating button** with pre-filled message
- **Contact form** with client + server validation
- **MongoDB storage** for all inquiries
- **Rate limiting + Helmet** security headers
- **SEO-friendly** meta tags

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas) free tier)

---

### Frontend

The frontend is a **single HTML file** — no build step needed.

**Option A — Open directly in browser:**
```bash
open frontend/index.html
```

**Option B — Serve with a local server:**
```bash
npx serve frontend/
# Visit http://localhost:3000
```

---

### Backend

```bash
cd backend

# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env
# Edit .env with your MongoDB URI and admin key

# 3. Start development server
npm run dev        # with auto-reload (nodemon)
# or
npm start          # production

# Server runs at http://localhost:5000
```

---

## 🔑 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/suryoday` |
| `PORT` | Server port | `5000` |
| `FRONTEND_URL` | Frontend URL for CORS | `https://suryoday.vercel.app` |
| `ADMIN_KEY` | Secret key for /api/inquiries | `my_secret_key_123` |

---

## 📡 API Endpoints

### POST `/api/inquiry`
Submit a student inquiry.

**Request body:**
```json
{
  "name": "Ramesh Patel",
  "phone": "9876543210",
  "standard": "Standard 10",
  "message": "I want to join for SSC board preparation"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Inquiry submitted successfully! We will contact you within 24 hours."
}
```

### GET `/api/inquiries`
Get all inquiries (admin only).

**Headers:**
```
x-admin-key: your_admin_key_from_env
```

---

## 🌐 Deployment

### Frontend → Vercel

1. Push project to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import repository
4. Set **Root Directory** to `frontend`
5. No build command needed (static HTML)
6. Click **Deploy** ✓

### Backend → Render

1. Go to [render.com](https://render.com) → New Web Service
2. Connect your GitHub repo
3. Settings:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Add **Environment Variables** in Render dashboard:
   - `MONGODB_URI` → your Atlas connection string
   - `FRONTEND_URL` → your Vercel URL
   - `ADMIN_KEY` → your secret key
5. Click **Create Web Service** ✓

### MongoDB Atlas (Free Cloud DB)

1. Sign up at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a free M0 cluster
3. Add database user + whitelist Render's IPs (or 0.0.0.0/0)
4. Copy connection string → paste into Render env as `MONGODB_URI`

---

## 🔒 Security Notes

- Never commit `.env` to version control (already in `.gitignore`)
- Change `ADMIN_KEY` to a long random string in production
- For production, restrict `FRONTEND_URL` to your exact domain
- Consider adding authentication middleware to `/api/inquiries`

---

## 📞 Contact Info Configured

| | |
|---|---|
| **Phone** | +91 90817 96128 |
| **WhatsApp** | Same number, pre-filled message |
| **Address** | Sunshine Complex, 12-13 Shiv Darshan Society, Savlia Circle, Sudama Chowk, Branch 2, Mota Varachha, Surat, Gujarat 395011 |
| **Hours** | Open till 8:00 PM |

---

## 🎨 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3 (custom), Vanilla JS |
| Animations | GSAP 3.12 + ScrollTrigger |
| Fonts | Playfair Display + DM Sans |
| Backend | Node.js + Express 4 |
| Database | MongoDB + Mongoose |
| Security | Helmet + express-rate-limit + CORS |
| Deploy (FE) | Vercel |
| Deploy (BE) | Render |

---

*Built with ❤️ for Suryoday Education, Surat*

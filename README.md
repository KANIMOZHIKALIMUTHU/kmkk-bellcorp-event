### Bellcorp Event Management
## Simple full-stack MERN app for events.

# Features

* User login/register
* Browse 20+ events
* Search + filter
* Event registration
* User dashboard
* Responsive design

# Quick Setup

1. Backend:
cd server
npm install
npm run dev

2. Frontend:
cd client  
npm install
npm run dev

3. Test Flow

* Go to localhost:5173
* Register: test@example.com / 123456
* Login → Browse events
* Search "React" → Register
* Dashboard → See your events

# Tech Stack

Frontend: React + Vite + React Router
Backend: Node.js + Express
Auth: JWT + Context API
Styling: CSS (Tailwind-inspired)

# API Endpoints

GET  /api/events          # List events
POST /api/auth/register   # Create user
POST /api/auth/login      # Login
POST /api/registrations   # Register event

# Folder Structure

├── server/     # Node.js API
├── client/     # React frontend
└── README.md
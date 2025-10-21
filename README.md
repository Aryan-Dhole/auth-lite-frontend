# 🔐 AuthLite Backend

The **AuthLite Backend** is a lightweight Node.js + Express + MongoDB authentication API built with simplicity, security, and scalability in mind.  
It handles user registration, login, and protected routes using JWT authentication.

---

## 🚀 Tech Stack

- **Node.js** — server runtime  
- **Express.js** — backend framework  
- **MongoDB + Mongoose** — database + ODM  
- **JWT (jsonwebtoken)** — authentication  
- **bcryptjs** — password hashing  
- **dotenv** — environment variables  
- **Render** — deployment  

---

## 📁 Folder Structure
authlite-frontend/
├── src/
│ ├── pages/
│ │ ├── Home.jsx
│ │ ├── Register.jsx
│ │ ├── Login.jsx
│ │ └── Profile.jsx
│ ├── components/
│ │ └── Navbar.jsx
│ ├── utils/
│ │ └── api.js # Base axios instance
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
├── package.json
└── README.md


---

## ⚙️ Setup Instructions

1. **Clone the repo**
   git clone https://github.com/yourusername/authlite-backend.git
   cd authlite-frontend

2. Install dependencies 

npm install

3. Run the server 
npm start

Server runs on http://localhost:5000


## 🧪 Test Flow

Register → create a new account
Login → authenticate and get JWT token
Redirect to /profile → view token-protected content
Logout → clear token and redirect home

## Future Upgrades

Persistent session with localStorage
Toast notifications (success/error)
Better form validation
Responsive animations

## Author: Aryan Dhole
"Full-stack auth made minimal and beautiful."

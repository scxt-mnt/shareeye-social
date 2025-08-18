# 🌐 Sheereye – Social Media App

A **fullstack social media platform** with modern authentication and scalable architecture.  

---

## 🚀 Features

- Responsive UI for login & registration  
- User authentication with JWT + cookies  
- Profile system with avatars & bios  
- Post creation (text, images, videos)  
- Like, comment & share features  
- Real-time updates with Redux state management  
- Error handling with user-friendly feedback  
- Scalable backend-ready structure  

---

## 📁 Folder Structure

src/
├── assets/ # Logos, icons, images
├── components/
│ ├── Login.tsx # Login form
│ ├── Register.tsx # Registration form
│ ├── Feed.tsx # Social media feed
│ ├── Post.tsx # Post component
│ └── Profile.tsx # User profile
├── styles/
│ └── *.module.css # Scoped CSS modules
├── redux/ # State management (auth, posts, users)
├── utils/
│ └── publicInstance.ts # Axios config, API utils
└── App.tsx # Entry point


---

## ⚙️ Technologies Used

- **Frontend**: React, TypeScript, TailwindCSS / CSS Modules  
- **State Management**: Redux  
- **Networking**: Axios  
- **Authentication**: JWT, cookie-parser  
- **Backend **: Express + Node.js  
- **Database **: PostgreSQL / MongoDB  

---

## 🔑 Authentication Flow

1. `useState` manages form states (login/register).  
2. On submit → Axios sends credentials to backend.  
3. Backend returns **JWT token** stored in cookies.  
4. Protected routes use Redux + Axios interceptors for auth.  
5. Errors (e.g., invalid password) are caught and shown.  

---

## 🛠️ Planned Features

- Friends system (follow/unfollow)  
- Private messaging  
- Notifications system  
- Cloud media upload (e.g., Cloudinary)  
- Dark mode support  

---

## ▶️ Getting Started

### 1️⃣ Clone the repo
```bash
git clone https://github.com/yourusername/sheereye.git
cd sheereye

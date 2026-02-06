# Backend Assignment – JWT Auth, RBAC & CRUD with React UI

This project is a full-stack backend assignment built with **Node.js, Express, SQLite, and React**.  
It implements secure authentication using **JWT**, **Role-Based Access Control (RBAC)**, and a complete **CRUD system for tasks**, along with a basic frontend UI.

---

## 🚀 Features

### 🔐 Authentication & Security
- User Registration & Login
- Password hashing using bcrypt
- JWT-based authentication
- Protected routes

### 👥 Role-Based Access Control (RBAC)
- **Admin**
  - Can view all tasks
  - Can delete any task
- **User**
  - Can view all tasks
  - Can delete only their own tasks

### 📋 Task Management (CRUD)
- Create tasks
- View tasks
- Delete tasks (with role restrictions)

### 🌐 Frontend UI (React)
- Register & Login forms
- Dashboard to manage tasks
- Displays logged-in user info
- JWT stored in localStorage
- Real-time task updates

### 📄 API Documentation
- Swagger UI integrated

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- SQLite
- JWT (jsonwebtoken)
- bcryptjs
- cors
- helmet

### Frontend
- React.js
- Fetch API
- CSS

---

## 📂 Project Structure

Backend_assignment/
│
├── src/
│ ├── config/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ └── app.js
│
├── frontend/
│ ├── src/
│ └── package.json
│
├── database.db
├── .env
├── README.md
└── package.json


---

## ▶️ How to Run Locally

### Backend

```bash
cd src
node app.js

Backend runs at:
http://localhost:5000

Frontend
cd frontend
npm start


Frontend runs at:
http://localhost:3000


🔑 Environment Variables
Create a .env file in root:
JWT_SECRET=your_secret_key
PORT=5000

📖 API Documentation
After running backend, open:
http://localhost:5000/api-docs


📈 Scalability Notes
To scale this application:
Use PostgreSQL/MySQL instead of SQLite
Add Redis caching for frequent requests
Dockerize backend & frontend
Use load balancers (NGINX)
Separate services (auth service, task service)
Use cloud deployment (AWS, Render, Vercel)


✅ Assignment Requirements Covered
✔ Secure JWT authentication
✔ Role-Based Access Control (RBAC)
✔ CRUD APIs
✔ Database design
✔ Frontend integration
✔ API documentation
✔ Scalability considerations

📽️ Demo
A short screen recording demonstrates:
User registration
Login
Task creation
RBAC behavior
Admin vs User permissions


👤 Rapolu Srinath

Developed as part of Backend Developer Assignment.



# 💻 HealthConnect Frontend

This is the frontend for **HealthConnect**, a full-stack, mobile-friendly healthcare appointment booking application. Built with **React** and **Axios**, it connects seamlessly to the HealthConnect backend to handle **user authentication**, **secure dashboard access**, and **appointment scheduling**.

---

## 🌟 Features

- 🔐 **User Registration & Login** with JWT
- 🧑‍⚕️ **Protected Dashboard** based on authentication
- 📅 **Book, View & Filter Appointments**
- ⚙️ **Search, Sort, and Filter** by status and reason
- 📱 **Responsive Design** for desktop and mobile
- 🔄 **Persistent Auth** with localStorage
- 🚫 Custom 404 error page

---

## 🛠 Tech Stack

- **Frontend**: React, React Router, Axios, Context API
- **Styling**: Tailwind CSS (or your preferred system)
- **Auth**: JSON Web Tokens (JWT)
- **API**: HealthConnect backend (Node.js, Express, MongoDB)
- **Deployment**: Vercel (Frontend), Render (Backend)

---

## 🔐 Environment Setup

Create a `.env` file in the root of the project:

```env
REACT_APP_API_BASE_URL=https://healthconnect-backend-j0j9.onrender.com/api

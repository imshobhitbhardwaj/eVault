# 🔐 eVault – Secure Cloud File Vault

eVault is a full-stack secure cloud file storage web application built using **Node.js, Express, MongoDB, and vanilla frontend (HTML, CSS, JavaScript)**.

It allows users to securely register, login, upload files, and download them from a protected dashboard.

---

## 🚀 Features

- 🔑 User Registration & Login system
- 🛡️ JWT Authentication
- ☁️ Secure file upload system
- 📂 File listing dashboard
- ⬇️ File download support (mobile + desktop)
- 🌐 Works over local network (mobile access supported)
- 📱 Responsive UI design

---

## 🧠 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- JWT (Authentication)
- Multer (File Upload)
- Helmet & CORS

### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla)

---

## 📁 Project Structure

```text
eVault/
│
├── server.js
├── config/
│   └── db.js
├── models/
│   ├── User.js
│   └── File.js
├── routes/
│   ├── authRoutes.js
│   └── fileRoutes.js
│
├── uploads/
│
└── public/
    ├── index.html
    ├── auth.html
    ├── dashboard.html
    ├── app.js
    └── style.css
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/imshobhitbhardwaj/eVault.git
cd eVault
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Setup environment variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

### 4. Run the server

```bash
npm run dev
```

---

## 🌐 Access the App

### Local Machine
```
http://localhost:5000
```

### Mobile (Same WiFi Network)
```
http://YOUR_LOCAL_IP:5000
Example: http://192.168.29.211:5000
```

---

## 📡 API Endpoints

### Authentication Routes
```
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

### File Routes
```
POST /api/files/upload
GET  /api/files/files
GET  /api/files/download/:id
```

---

## 🔐 Security Features

- JWT-based authentication
- Protected API routes
- Rate limiting
- Secure file handling
- Helmet security headers

---

## 🛠️ Fixes Included

- ✔ Mobile download issue fixed
- ✔ Large file download optimized
- ✔ Login/Register routing fixed
- ✔ Network access enabled (0.0.0.0 support)
- ✔ UI improved with spacing and layout fixes

---

## 🚀 Future Improvements

- File encryption before upload
- Cloud storage integration (AWS / Firebase)
- Download progress bar
- User roles (Admin / User)
- PWA mobile app support

---

## 👨‍💻 Author

**Shobhit Bhardwaj**

GitHub: https://github.com/imshobhitbhardwaj

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub.
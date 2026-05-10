# 🔐 eVault – Secure Cloud File Vault

eVault is a **secure full-stack cloud file storage system** built using **Node.js, Express, MongoDB, and vanilla frontend (HTML, CSS, JavaScript)**.

It supports **user authentication, encrypted file storage, and secure file download system** with a modular backend architecture.

---

## 🚀 Features

- 🔑 User Registration & Login (JWT Authentication)
- 🛡️ Secure Auth Middleware Protection
- ☁️ File Upload System with Encryption Support
- 🔐 Chunk-based File Encryption & Decryption
- 📂 File Management Dashboard
- ⬇️ Secure File Download System (Mobile + Desktop)
- 🌐 Works on Local Network (Mobile Access Supported)
- ⚡ Rate Limiting & Security Headers
- 📱 Responsive Vanilla Frontend UI

---

## 🧠 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Multer (File Upload Handling)
- Helmet (Security Headers)
- Express Rate Limit

### Security / Utils Layer
- AES-style File Encryption (Chunk-based)
- File Hashing System
- Secure Decryption Logic
- Custom Utility Functions

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
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   ├── User.js
│   └── File.js
│
├── routes/
│   ├── authRoutes.js
│   └── fileRoutes.js
│
├── utils/
│   ├── encryptChunk.js
│   ├── decryptChunk.js
│   └── hashFile.js
│
├── uploads/
│   └── (encrypted stored files)
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
ENCRYPTION_KEY=your_encrypt_key
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
Example: http://192.168.29.101:5000
```

---

## 📡 API Endpoints

### Authentication
```
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

### File System
```
POST /api/files/upload
GET  /api/files/files
GET  /api/files/download/:id
```

---

## 🔐 Security Features

- JWT Authentication Middleware
- Protected API Routes
- Rate Limiting (Anti-abuse protection)
- Helmet Security Headers
- Encrypted File Storage (Chunk-based)
- File Hash Validation
- Secure Download Handling

---

## 🛠️ Architecture Improvements

- Modular Route System
- Middleware-based Authentication
- Utility Layer for Encryption & Hashing
- Clean MVC-inspired structure
- Scalable backend design

---

## 🛠️ Fixes Included

- ✔ Mobile download issue fixed
- ✔ Large file download optimized
- ✔ Login/Register routing fixed
- ✔ Network access enabled (0.0.0.0 support)
- ✔ UI spacing & layout improved
- ✔ Rate limit proxy issue handled
- ✔ Secure file handling improved

---

## 🚀 Future Improvements

- File encryption upgrade (AES-256 standard)
- Cloud storage integration (AWS S3 / Firebase)
- Download progress bar
- Role-based access control (Admin/User)
- PWA mobile app support
- File versioning system

---

## 👨‍💻 Author

**Shobhit Bhardwaj**

GitHub: https://github.com/imshobhitbhardwaj

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub.
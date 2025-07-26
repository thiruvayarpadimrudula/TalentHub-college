# 🎓 TalentHub@College

TalentHub@College is a full-stack web application that allows college students to **showcase their projects**, **explore peer submissions**, and **upvote** their favorite works. This platform helps to build a vibrant ecosystem of innovation within campus communities.

---

## 🚀 Features

- ✅ Upload projects with image, description, tags, and GitHub link  
- 🔍 Explore all uploaded projects  
- 👍 Upvote or unvote other students' work  
- 🖼️ Image upload and storage with backend support  
- 🧾 Stores project metadata in MongoDB  

---

## 🛠 Tech Stack

**Frontend:**
- React
- Axios
- Tailwind CSS

**Backend:**
- Node.js
- Express
- MongoDB (Mongoose)
- Multer (for image uploads)
- CORS & dotenv

---

## 📦 Installation & Setup

### 🔧 Backend

1. Clone the repo:
   ```bash
   git clone https://github.com/thiruvayarpadimrudula/TalentHub-College.git
   cd TalentHub-College/talenthub-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. Start the backend:
   ```bash
   node server.js
   ```

---

### 🎨 Frontend

1. Go to frontend directory:
   ```bash
   cd ../talenthub-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React app:
   ```bash
   npm start
   ```

---

## 🌐 API Endpoints

| Method | Endpoint                   | Description             |
|--------|----------------------------|-------------------------|
| GET    | `/api/projects`            | Fetch all projects      |
| POST   | `/api/projects`            | Upload a new project    |
| PATCH  | `/api/projects/:id/upvote` | Upvote or unvote project |

---

## 📁 Folder Structure

```
talenthub/
├── talenthub-frontend/      # React frontend
├── talenthub-backend/       # Node.js backend
│   ├── uploads/             # Uploaded images
│   ├── models/              # Mongoose schemas
│   └── routes/              # API route handlers
```

---

## 🤝 Contributors

- **T. Mrudula** – Developer & Project Creator

---

## 📸 Screenshots
<img width="1352" height="675" alt="Screenshot 2025-07-26 153204" src="https://github.com/user-attachments/assets/b2c2fed8-c46c-45df-b506-f3d291d1ab15" />
<img width="1355" height="682" alt="Screenshot 2025-07-26 151113" src="https://github.com/user-attachments/assets/a23accdd-92e9-4ac5-9341-04d83c264824" />
<img width="1365" height="722" alt="Screenshot 2025-07-26 141735" src="https://github.com/user-attachments/assets/e8e6819a-de5a-4488-930e-cd295511bff6" />



---

## 📌 Future Features

- Comment system for each project  
- Profile pages for each student  
- Admin moderation panel  

---

## 🌟 Show some love

If you like this project, give it a ⭐ on GitHub or share it with your friends!

---

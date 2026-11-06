
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import multer from 'multer';
import projectRoutes from './routes/projectRoutes.js';

dotenv.config();
const app = express();
const __dirname = path.resolve(); // Get directory path

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS config
const allowedOrigins = [
  'https://talenthub-college-frontend1.onrender.com',
  'http://localhost:3000',
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.options('*', cors());

// Serve static uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use('/api/projects', projectRoutes);

// ✅ Serve frontend build
app.use(express.static(path.join(__dirname, 'build')));

// ✅ Fallback for SPA routes (like /explore)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        message: 'Image must be smaller than 5 MB'
      });
    }
  }

  return res.status(400).json({
    message: err.message || 'File upload failed'
  });
});
// MongoDB connection and server start
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB Connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error('DB connection error:', err));

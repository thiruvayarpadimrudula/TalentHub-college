// server.js
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import projectRoutes from './routes/projectRoutes.js';
import path from 'path';

const app = express();
dotenv.config();

// Middlewares
// app.use(cors({
//   origin: ['http://localhost:3000', 'https://talenthub-college-frontend1.onrender.com'],
//   credentials: true
// }));app.use(express.json());
app.use(cors({
  origin: ['https://talenthub-college-frontend1.onrender.com'],
  methods: ['GET', 'POST'],
  credentials: true
}));

// Static files - VERY IMPORTANT
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use('/api/projects', projectRoutes);

// Connect DB and start server
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('MongoDB Connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err) => console.error(err));

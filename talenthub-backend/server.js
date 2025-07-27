// // server.js
// import express from 'express';
// import cors from 'cors';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import projectRoutes from './routes/projectRoutes.js';
// import path from 'path';

// const app = express();
// dotenv.config();
// const allowedOrigins = [
//   'https://talenthub-college-frontend1.onrender.com',
//   'http://localhost:3000'
// ];

// app.use(cors({
//   origin: allowedOrigins,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true
// }));
// app.options('*', cors()); // Allow pre-flight across all routes


// // Static files - VERY IMPORTANT
// const __dirname = path.resolve();
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // API routes
// app.use('/api/projects', projectRoutes);

// // Connect DB and start server
// const PORT = process.env.PORT || 5000;
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// .then(() => {
//   console.log('MongoDB Connected');
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// })
// .catch((err) => console.error(err));

// // app.use(express.static(path.join(__dirname, 'build'))); // if your build is in 'build'

// // // Fallback: always return index.html
// // app.get('*', (req, res) => {
// //   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// // });
// server.js
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import projectRoutes from './routes/projectRoutes.js';
import path from 'path';

const app = express();
dotenv.config();

const allowedOrigins = [
  'https://talenthub-college-frontend1.onrender.com',
  'http://localhost:3000'
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.options('*', cors());

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving for uploaded images
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 👉 API routes
app.use('/api/projects', projectRoutes);

// 👉 Serve frontend (React build)
app.use(express.static(path.join(__dirname, 'client', 'build')));

// 👉 Fallback: Serve index.html for any route not handled by the API
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// 👉 Connect to DB and start server
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB Connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err) => console.error(err));


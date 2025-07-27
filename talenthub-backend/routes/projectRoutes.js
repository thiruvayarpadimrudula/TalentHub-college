import express from 'express';
import multer from 'multer';
import Project from '../models/Project.js';
import path from 'path';

// Setup multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Folder name
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage });

const router = express.Router();

// ✅ GET all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ POST a new project with image upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, email, title, description, link, tags } = req.body;
    const imagePath = req.file ? /uploads/${req.file.filename} : null;

    const newProject = new Project({
      name,
      email,
      title,
      description,
      link,
      image: imagePath,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      upvotes: 0,
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ PUT /api/projects/:id/upvote
// router.put('/:id/upvote', async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.id);
//     if (!project) return res.status(404).json({ message: 'Project not found' });

//     project.upvotes += 1;
//     await project.save();

//     res.json(project);
//   } catch (err) {
//     console.error('Upvote error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });
router.put('/:id/upvote', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    project.upvotes += 1;
    await project.save();

    // Return only upvotes count for consistency
    res.json({ upvotes: project.upvotes });
  } catch (err) {
    console.error('Upvote error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


// ✅ PUT /api/projects/:id/unvote
router.put('/:id/unvote', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    if (project.upvotes > 0) project.upvotes -= 1;
    await project.save();

    res.json({ upvotes: project.upvotes });
  } catch (err) {
    console.error('Unvote error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

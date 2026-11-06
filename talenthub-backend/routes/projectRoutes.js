import express from 'express';
import multer from 'multer';
import Project from '../models/Project.js';
import cloudinary from '../config/cloudinary.js';
import path from 'path';


// Setup multer for image uploads
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, PNG and WEBP images are allowed'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});
const router = express.Router();


// GET projects with pagination
router.get('/', async (req, res) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 10));

    const skip = (page - 1) * limit;

    const [projects, totalProjects] = await Promise.all([
      Project.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),

      Project.countDocuments()
    ]);

    res.status(200).json({
      projects,
      currentPage: page,
      totalPages: Math.ceil(totalProjects / limit),
      totalProjects
    });

  } catch (err) {
    console.error('Fetch projects error:', err);
    res.status(500).json({ message: 'Failed to fetch projects' });
  }
});

// ✅ POST a new project with image upload (bug fixed)

// POST a new project with Cloudinary image upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, email, title, description, link, tags } = req.body;

    let imageUrl = null;

    // Upload image to Cloudinary
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'talenthub-projects',
            resource_type: 'image'
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        stream.end(req.file.buffer);
      });

      imageUrl = result.secure_url;
    }

    const newProject = new Project({
      name,
      email,
      title,
      description,
      link,
      image: imageUrl,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      upvotes: 0,
    });

    const savedProject = await newProject.save();

    res.status(201).json(savedProject);

  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({
      message: 'Project upload failed'
    });
  }
});

// ✅ PUT /api/projects/:id/upvote (consistent response)
router.put('/:id/upvote', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    project.upvotes += 1;
    await project.save();

    res.json({ upvotes: project.upvotes });
  } catch (err) {
    console.error('Upvote error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ PUT /api/projects/:id/unvote (consistent response)
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

import express from 'express';
import Project from '../models/Project.js';

const router = express.Router();

// GET all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
// PUT /api/projects/:id/upvote
router.put('/:id/upvote', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    project.upvotes += 1;
    await project.save();

    res.json(project);
  } catch (err) {
    console.error('Upvote error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
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

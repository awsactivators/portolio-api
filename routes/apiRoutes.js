const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Get all projects
router.get('/projects', async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

// Get projects by category (devops/software)
router.get('/projects/:category', async (req, res) => {
  const { category } = req.params;
  const projects = await Project.find({ category });
  res.json(projects);
});

module.exports = router;

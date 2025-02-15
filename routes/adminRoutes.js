const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { isAuthenticated } = require("../middleware/authMiddleware");


// Admin Panel - Show CRUD Page
router.get("/", isAuthenticated, async (req, res) => {
  const projects = await Project.find();
  const successMessage = req.session.successMessage || null;
  const errorMessage = req.session.errorMessage || null;

  // Clear messages after displaying them
  req.session.successMessage = null;
  req.session.errorMessage = null;

  res.render("admin", { projects, successMessage, errorMessage });
});



// Add a new project
router.post("/add", isAuthenticated, async (req, res) => {
  const { title, description, techStack, githubLink, category } = req.body;
  
  try {
    const project = new Project({ title, description, techStack, githubLink, category });
    await project.save();
    req.session.successMessage = "Project added successfully!";
  } catch (err) {
    req.session.errorMessage = "Failed to add project.";
  }

  res.redirect("/admin");
});



// Delete a project
router.post("/delete/:id", isAuthenticated, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    req.session.successMessage = "Project deleted successfully!"; 
  } catch (err) {
    req.session.errorMessage = "Failed to delete project.";
  }

  res.redirect("/admin");
});


// Render Edit Form
router.get("/edit/:id", isAuthenticated, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).send("Project not found");
    }
    res.render("edit", { project });
  } catch (err) {
    res.status(500).send(err.message);
  }
});


// Update Project
router.post("/edit/:id", isAuthenticated, async (req, res) => {
  const { title, description, techStack, githubLink, category } = req.body;
  
  try {
    await Project.findByIdAndUpdate(req.params.id, {
      title,
      description,
      techStack,
      githubLink,
      category,
    });
    req.session.successMessage = "Project updated successfully!"; 
  } catch (err) {
    req.session.errorMessage = "Failed to update project.";
  }

  res.redirect("/admin");
});

module.exports = router;

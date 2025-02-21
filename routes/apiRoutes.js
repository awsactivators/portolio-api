const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const Post = require("../models/Post");

// Get all projects
router.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});



// Get projects by category (devops/software)
router.get("/projects/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const projects = await Project.find({ category });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch projects by category" });
  }
});



// Get all posts
router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});



// Get a single post by ID
router.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

module.exports = router;

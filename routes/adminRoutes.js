const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const Post = require("../models/Post");
const { isAuthenticated } = require("../middleware/authMiddleware");

// Paignation for 4 post/project on the page
const ITEMS_PER_PAGE = 4;


// Admin Panel - Show Dashboard (Projects & Posts)
router.get("/", isAuthenticated, async (req, res) => {
  try {
    // Get the current page number from query params or default to 1
    const projectPage = parseInt(req.query.projectPage) || 1;
    const postPage = parseInt(req.query.postPage) || 1;

    // Count total number of projects and posts
    const totalProjects = await Project.countDocuments();
    const totalPosts = await Post.countDocuments();

    // Fetch paginated projects
    const projects = await Project.find()
      .skip((projectPage - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    // Fetch paginated posts
    const posts = await Post.find()
      .skip((postPage - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    // Fetch success & error messages from session
    const successMessage = req.session.successMessage || null;
    const errorMessage = req.session.errorMessage || null;

    // Clear session messages after rendering
    req.session.successMessage = null;
    req.session.errorMessage = null;

    // Render admin panel with pagination data
    res.render("admin", {
      projects,
      posts,
      successMessage,
      errorMessage,
      projectPage,
      postPage,
      totalProjectPages: Math.ceil(totalProjects / ITEMS_PER_PAGE),
      totalPostPages: Math.ceil(totalPosts / ITEMS_PER_PAGE),
    });

  } catch (error) {
    console.error("Pagination Error:", error);
    res.status(500).send("Server Error");
  }
});



// Render Add Project Page
router.get("/add-project", isAuthenticated, (req, res) => {
  res.render("add-project");
});

// Add New Project
router.post("/add-project", isAuthenticated, async (req, res) => {
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



// Render Edit Project Page
router.get("/edit-project/:id", isAuthenticated, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).send("Project not found");
    }
    res.render("edit-project", { project });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update Project
router.post("/edit-project/:id", isAuthenticated, async (req, res) => {
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



// Render Add Post Page
router.get("/add-post", isAuthenticated, (req, res) => {
  res.render("add-post");
});

// Add New Post
router.post("/add-post", isAuthenticated, async (req, res) => {
  const { title, body, links, techStack } = req.body;

  try {
    const formattedBody = body.replace(/\n/g, "<br>");
    const post = new Post({ title, body: formattedBody, links, techStack });
    await post.save();
    req.session.successMessage = "Post published successfully!";
  } catch (err) {
    req.session.errorMessage = "Failed to publish post.";
  }

  res.redirect("/admin");
});



// Render Edit Post Page
router.get("/edit-post/:id", isAuthenticated, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    res.render("edit-post", { post });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update Post
router.post("/edit-post/:id", isAuthenticated, async (req, res) => {
  const { title, body, links, techStack } = req.body;

  try {
    const formattedBody = body.replace(/\n/g, "<br>");
    await Post.findByIdAndUpdate(req.params.id, {
      title,
      body: formattedBody,
      links,
      techStack,
    });
    req.session.successMessage = "Post updated successfully!";
  } catch (err) {
    req.session.errorMessage = "Failed to update post.";
  }

  res.redirect("/admin");
});



// Delete a Project
router.post("/delete-project/:id", isAuthenticated, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    req.session.successMessage = "Project deleted successfully!";
  } catch (err) {
    req.session.errorMessage = "Failed to delete project.";
  }

  res.redirect("/admin");
});



// Delete a Post
router.post("/delete-post/:id", isAuthenticated, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    req.session.successMessage = "Post deleted successfully!";
  } catch (err) {
    req.session.errorMessage = "Failed to delete post.";
  }

  res.redirect("/admin");
});

module.exports = router;

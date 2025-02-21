const express = require("express");
const router = express.Router();
const { addAdmin, authenticateAdmin, getAdmin } = require("../models/Admin");

// Root Route - Redirects to Register/Login
router.get("/", async (req, res) => {
  const adminExists = await getAdmin("admin"); 

  if (adminExists) {
    res.redirect("/auth/login"); 
  } else {
    res.redirect("/auth/register"); 
  }
});


// Render Register Page
router.get("/register", (req, res) => {
  res.render("register");
});

// Register Admin
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const success = await addAdmin(username, password);

  if (success) {
    req.session.successMessage = "Registration successful! Please log in.";
    res.redirect("/auth/login");
  } else {
    req.session.errorMessage = "Admin already exists. Try logging in.";
    res.redirect("/auth/login");
  }
});



// Render Login Page
router.get("/login", (req, res) => {
  const successMessage = req.session.successMessage || null;
  const errorMessage = req.session.errorMessage || null;

  req.session.successMessage = null;
  req.session.errorMessage = null;

  res.render("login", { successMessage, errorMessage });
});

// Login Admin
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const authenticated = await authenticateAdmin(username, password);

  if (authenticated) {
    // Store admin session
    req.session.user = { username }; 
    res.redirect("/admin");
  } else {
    res.status(401).render("login", { error: "Invalid username or password. Please try again." });
  }
});



// Logout Admin
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/auth/login");
  });
});

module.exports = router;

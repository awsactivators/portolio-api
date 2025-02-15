require("dotenv").config();
const express = require('express');
const path = require('path');
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const { connect } = require("./db"); 

const app = express();
const PORT = process.env.PORT || 5005;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use(
  sessions({
    secret: process.env.SESSIONSECRET,
    name: "MyUniqueSessID",
    saveUninitialized: false,
    resave: false,
    cookie: { httpOnly: true, secure: false }
  })
);

// Call database connection function
connect(); 

// Load Authentication Routes 
app.use("/auth", require("./routes/authRoutes"));

// Redirect root `/` to `/auth/register` or `/auth/login`
app.get("/", async (req, res) => {
  const { getAdmin } = require("./models/Admin");
  const adminExists = await getAdmin("admin");

  if (adminExists) {
    res.redirect("/auth/login");
  } else {
    res.redirect("/auth/register");
  }
});

const { isAuthenticated } = require("./middleware/authMiddleware");
app.use('/admin', isAuthenticated, require('./routes/adminRoutes'));
app.use('/api', require('./routes/apiRoutes'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

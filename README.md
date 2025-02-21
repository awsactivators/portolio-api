# **Admin Project Management System**

Render Url: [Render](https://portolio-api-wsal.onrender.com)

## **📌 Overview**
This project is an **Admin Project Management System** built with **Node.js, Express, MongoDB, and Pug**. It allows administrators to **create, edit, delete, and manage projects** securely with authentication.

## **🚀 Features**
- **Admin Authentication** (Register, Login, Logout)
- **Session-Based Authentication**
- **CRUD Operations on Projects** (Add, Edit, Delete)
- **Project Categories** (`DevOps` and `Software`)
- **Bootstrap-Powered UI**
- **Success/Error Notifications**
- **API Endpoints to Fetch Projects**
- **Database Connection with MongoDB Atlas**
- **Secure Password Hashing** using `crypto`

## **🛠️ Tech Stack**
- **Backend:** Node.js, Express.js
- **Frontend:** Pug, Bootstrap 5
- **Database:** MongoDB (Mongoose ORM)
- **Authentication:** Session-based Authentication
- **Environment Management:** dotenv

---

## **📂 Project Structure**
```
├── public/             # Static files (CSS, JS, Images)
|   ├── css/
|     ├── styles.css
├── routes/             # Route handlers
│   ├── authRoutes.js   # Authentication routes
│   ├── adminRoutes.js  # Admin project management routes
│   ├── apiRoutes.js    # API endpoints for fetching projects
├── models/             # Database models
│   ├── Admin.js        # Admin schema & authentication logic
│   ├── Project.js      # Project schema
|   ├── Post.js         # Project schema
├── views/              # Pug templates for frontend rendering
│   ├── admin.pug       # Admin dashboard
│   ├── login.pug       # Admin login page
│   ├── register.pug    # Admin registration page
│   ├── add-post.pug    # Add post form
│   ├── add-project.pug # Add project form
│   ├── edit-project.pug# Edit project form
│   ├── edit-post.pug   # Edit post form
├── middleware/         # Middleware functions
│   ├── authMiddleware.js# Authentication middleware
├── db.js               # MongoDB connection logic
├── index.js            # Main application entry point
├── .env                # Environment variables (ignored in Git)
├── README.md           # Project documentation
├── package.json        # Dependencies & scripts
```

---

## **⚙️ Installation & Setup**

### **1️⃣ Clone the Repository**
```sh
 git clone https://github.com/awsactivators/portfolio-api.git
 cd portfolio-api
```

### **2️⃣ Install Dependencies**
```sh
 npm install
```

### **3️⃣ Set Up MongoDB**

This project uses MongoDB Atlas, but you can use a local MongoDB instance as well.

#### Using MongoDB Atlas (Recommended)

1. Create a MongoDB Atlas account: [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database)

2. Create a Cluster and Database.

3. Get your Connection String from the Atlas dashboard.

4. Update your `.env` file with the connection details.

#### Using Local MongoDB

1. Install MongoDB locally: [MongoDB Installation Guide](https://www.mongodb.com/try/download/community)

2. Start MongoDB:
`mongod --dbpath /path/to/data/db`



### **3️4️⃣ Set Up Environment Variables**
Create a `.env` file in the root directory and add the following:
```sh
PORT=5005
SESSIONSECRET=your-secret-key
DBUSER=your-mongodb-user
DBPWD=your-mongodb-password
DBHOST=your-mongodb-host
DBNAME=your-database-name
SALT=your-salt-key
```

### **5️⃣ Start the Server**
```sh
 npm run dev
```

The server will start at **`http://localhost:5005`**.

---

## **🔑 Authentication Routes**
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/auth/register` | Register an admin Page |
| POST | `/auth/register` | Register a new admin |
| GET | `/auth/login` | Show login form Page |
| POST | `/auth/login` | Login admin |
| GET | `/auth/logout` | Logout admin |

---

## **📌 Admin Routes (Protected)**
| Method  | Route                     | Description |
| --------|----------------------------|------------- |
| GET     | `/admin`                   | Admin dashboard |
| POST    | `/admin/add-project`        | Add a new project |
| GET     | `/admin/edit-project/:id`   | Render project edit form |
| POST    | `/admin/edit-project/:id`   | Update project details |
| POST    | `/admin/delete-project/:id` | Delete a project |
| POST    | `/admin/add-post`           | Publish a new post |
| GET     | `/admin/edit-post/:id`      | Render post edit form |
| POST    | `/admin/edit-post/:id`      | Update post details |
| POST    | `/admin/delete-post/:id`    | Delete a post |


---

## **📡 API Endpoints**
| Method  | Route                 | Description |
| --------|------------------------|------------- |
| GET     | `/api/projects`        | Get all projects |
| GET     | `/api/projects/:category` | Get projects by category (devops/software) |
| GET     | `/api/posts`           | Get all posts |
| GET     | `/api/posts/:id`       | Get a single post by ID |


---

## **🔒 Security Measures**
- **Session-Based Authentication**: Ensures only logged-in admins can manage projects.
- **Password Hashing**: Uses `crypto.scryptSync` for password encryption.
- **Middleware Protection**: Routes are protected by `isAuthenticated` middleware.
- **Environment Variables**: Credentials stored in `.env` to prevent exposure.

---

## **🛠️ Future Improvements**
- Implement **JWT-based authentication** instead of session-based.
- Add **pagination for projects**.
- Improve **error handling and validation**.
- Implement **role-based access control (RBAC)**.
- Add **file upload feature** for project images.

---

## **📜 License**
This project is **MIT licensed**.

---

## **🤝 Contributing**
Pull requests are welcome! 🚀

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a Pull Request

---

## **💬 Contact**
- **GitHub:** [awsactivators](https://github.com/awsactivators)
- **Email:** awavieve@gmail.com

🚀 **Happy Coding!**


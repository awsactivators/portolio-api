const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  techStack: { type: String },
  githubLink: { type: String },
  category: { type: String, enum: ['devops', 'software'], required: true }
});

module.exports = mongoose.model('Project', ProjectSchema);

// models/Workflow.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  author: String,
  text: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const workflowSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  dueDate: String,
  assignedTo: String,
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium'
  },
  comments: [commentSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Workflow', workflowSchema);

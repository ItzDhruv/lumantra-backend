const express = require('express');
const router = express.Router();
const Workflow = require('../models/Workflow');

// Create a new workflow
router.post('/workflow', async (req, res) => {
  try {
    const workflow = new Workflow(req.body);
    const savedWorkflow = await workflow.save();
    res.status(201).json(savedWorkflow);
  } catch (err) {
    console.error('Error creating workflow:', err);
    res.status(500).json({ message: 'Failed to create workflow' });
  }
});

// Get all workflows
router.get('/workflow', async (req, res) => {
  try {
    const workflows = await Workflow.find();
    res.status(200).json(workflows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch workflows' });
  }
});

// Add comment to a workflow
router.post('/workflow/:id/comment', async (req, res) => {
  try {
    const workflow = await Workflow.findById(req.params.id);
    if (!workflow) {
      return res.status(404).json({ message: 'Workflow not found' });
    }

    workflow.comments.push({
      author: req.body.author || 'Anonymous',
      text: req.body.text
    });

    const updatedWorkflow = await workflow.save();
    res.status(200).json(updatedWorkflow);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add comment' });
  }
});

// Get a single workflow by ID
router.get('/workflow/:id', async (req, res) => {
  try {
    const workflow = await Workflow.findById(req.params.id);
    if (!workflow) {
      return res.status(404).json({ message: 'Workflow not found' });
    }
    res.status(200).json(workflow);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch workflow' });
  }
});


// ❌ Delete a workflow
router.delete('/workflow/:id', async (req, res) => {
  try {
    const deletedWorkflow = await Workflow.findByIdAndDelete(req.params.id);
    if (!deletedWorkflow) {
      return res.status(404).json({ message: 'Workflow not found' });
    }
    res.status(200).json({ message: 'Workflow deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete workflow' });
  }
});

module.exports = router;

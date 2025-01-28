
const express = require('express');
const Task = require('../models/Task');
const sendEmail = require('../utils/email');

const router = express.Router();

// Create Task
router.post('/', async (req, res) => {
    try {
        const { title, status, dueDate, email } = req.body;
        const task = await Task.create({ title, status, dueDate:new Date(dueDate), email });

        const emailMessage = `Reminder: Your task ${title} is due on ${dueDate}`;
        await sendEmail(email, 'Task Due Reminder', emailMessage);
        res.status(201).json(task);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
        
    }
});

// View Task
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, status, dueDate, email } = req.body;

        // Fetch the task to check the current status
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Update the task fields
        if (title) task.title = title;
        if (status) task.status = status;
        if (dueDate) task.dueDate = dueDate;

        await task.save();

        // If the task status is changed to "complete", send an email
        // let email = task.email; //'mohanrajib21@gmail.com';
        // let email = 'mohanrajib21@gmail.com';
        if (status === 'complete') {
            const emailMessage = `Congratulations! Your task "${task.title}" has been marked as completed. Great job!`;
            await sendEmail(email || task.email, 'Task Completed Notification', emailMessage);
        }

        res.status(200).json(task);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: error.message });
    }
});




// Delete Tasks
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Task.findByIdAndDelete(id);
        res.status(200).json({ message: 'Task Deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

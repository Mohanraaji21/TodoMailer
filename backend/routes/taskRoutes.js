const express = require('express');
const Task = require('../models/Task');

const router = express.Router();

//Create Task
router.post('/', async(req, res)=>{
    try {
        
        const {title, status, dueDate} = req.body;
        const task = await Task.create({title, status, dueDate});
        res.status(201).json(task);

    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

//View Task
router.get('/', async(req, res)=>{
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});




module.exports = router;
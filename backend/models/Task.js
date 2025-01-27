// const express = require('express');
const mongoose = require('mongoose');
// const {Schema } = mongoose.Schema;

const TaskSchema = mongoose.Schema({
    title : {
        type:String,
        required: true,
    },
    status:{
        type:String,
        enum:['start', 'in-progress', 'pending', 'complete'],
        default: 'pending'
    },
    dueDate : {
        type: Date,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    }
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
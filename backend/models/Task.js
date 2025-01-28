const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['start', 'in-progress', 'pending', 'complete'],
        default: 'pending',
    },
    dueDate: {
        type: Date,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    email: {
        type: String, 
        required: true, 
    },
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;

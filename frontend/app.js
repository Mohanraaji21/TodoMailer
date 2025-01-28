// const addTaskButton = document.getElementById('addTaskBtn');
// const taskTitleInput = document.getElementById('taskTitle');
// const taskStatusInput = document.getElementById('taskStatus');
// const taskDueDateInput = document.getElementById('taskDueDate');
// const taskEmailInput = document.getElementById('taskEmail');
// const taskList = document.getElementById('taskList');

// // Fetch and display tasks
// const fetchTasks = async () => {
//     try {
//         const res = await fetch('http://localhost:5000/api/tasks');
//         const tasks = await res.json();
//         taskList.innerHTML = ''; 

//         tasks.forEach(task => {
//             const li = document.createElement('li');
        
//             const textSpan = document.createElement('span');
//             textSpan.textContent = `${task.title} - Due: ${task.dueDate}`;
        
//             const statusDropdown = document.createElement('select');
//             const statuses = ['pending', 'in-progress', 'complete'];
        
//             statuses.forEach(status => {
//                 const option = document.createElement('option');
//                 option.value = status;
//                 option.textContent = status;
//                 if (task.status === status) {
//                     option.selected = true;
//                 }
//                 statusDropdown.appendChild(option);
//             });


//             statusDropdown.onchange = async () => {
//                 try {
//                     const updatedTask = { 
//                         status: statusDropdown.value,
//                         email: task.email // Pass the task's email for sending the email notification
//                     };
            
//                     await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
//                         method: 'PUT',
//                         headers: {
//                             'Content-Type': 'application/json',
//                         },
//                         body: JSON.stringify(updatedTask),
//                     });
            
//                     li.classList.remove('pending-list', 'in-progress-list', 'complete-list');
            
//                     if (statusDropdown.value === 'pending') {
//                         li.classList.add('pending-list');
//                     }
            
//                     if (statusDropdown.value === 'in-progress') {
//                         li.classList.add('in-progress-list');
//                     }
            
//                     if (statusDropdown.value === 'complete') {
//                         li.classList.add('complete-list');
//                     }
            
//                     console.log(`Task status updated to ${statusDropdown.value}`);
//                 } catch (error) {
//                     console.error('Error updating task status:', error);
//                 }
//             };
            
            
        
//             const buttonContainer = document.createElement('div');
//             const editButton = document.createElement('button');
//             editButton.textContent = 'Edit';
//             editButton.onclick = () => editTask(task._id);
        
//             const deleteButton = document.createElement('button');
//             deleteButton.textContent = 'Delete';
//             deleteButton.onclick = () => deleteTask(task._id);
        
//             buttonContainer.appendChild(editButton);
//             buttonContainer.appendChild(deleteButton);

//             if (statusDropdown.value === 'pending') {
//                 li.classList.add('pending-list');
//             }
    
//             if (statusDropdown.value === 'in-progress') {
//                 li.classList.add('in-progress-list');
//             }
    
//             if (statusDropdown.value === 'complete') {
//                 li.classList.add('complete-list');
//             }
        
//             li.appendChild(textSpan);
//             li.appendChild(statusDropdown);
//             li.appendChild(buttonContainer);
        
         
//             taskList.appendChild(li);
//         });
        
//     } catch (error) {
//         console.error('Error fetching tasks:', error);
//     }
// };

// // Add a new task
// const addTask = async () => {
//     if (taskTitleInput.value.trim() && taskDueDateInput.value.trim() && taskEmailInput.value.trim()) {

//         // const rawDate = taskDueDateInput.value; 
//         // const formattedDate = new Date(rawDate).toISOString().split('T')[0];

//         const newTask = {
//             title: taskTitleInput.value,
//             status: taskStatusInput.value,
//             // dueDate: taskDueDateInput.value,
//             // dueDate: formattedDate,
//             dueDate: new Date(taskDueDateInput.value),
//             email: taskEmailInput.value
//         };

//         try {
//             const res = await fetch('http://localhost:5000/api/tasks', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(newTask),
//             });

//             if (res.ok) {
//                 taskTitleInput.value = '';
//                 taskStatusInput.value = 'pending';
//                 taskDueDateInput.value = '';
//                 taskEmailInput.value = '';
//                 fetchTasks();
//             } else {
//                 console.error('Error adding task');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     }
// };

// // Edit a task
// const editTask = async (taskId) => {
//     const newTitle = prompt("Enter new title:");
//     const newStatus = prompt("Enter new status (pending, in-progress, complete):");
//     const newDueDate = prompt("Enter new due date:");

//     const updatedTask = {
//         title: newTitle,
//         status: newStatus,
//         dueDate: newDueDate,
//     };

//     try {
//         await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(updatedTask),
//         });

//         fetchTasks();
//     } catch (error) {
//         console.error('Error updating task:', error);
//     }
// };

// // Delete a task
// const deleteTask = async (taskId) => {
//     try {
//         await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
//             method: 'DELETE',
//         });

//         fetchTasks();
//     } catch (error) {
//         console.error('Error deleting task:', error);
//     }
// };

// // Event listener for adding tasks
// addTaskButton.addEventListener('click', addTask);



// // Initial fetch to load tasks
// fetchTasks();


const addTaskButton = document.getElementById('addTaskBtn');
const taskTitleInput = document.getElementById('taskTitle');
const taskStatusInput = document.getElementById('taskStatus');
const taskDueDateInput = document.getElementById('taskDueDate');
const taskEmailInput = document.getElementById('taskEmail');
const taskList = document.getElementById('taskList');
const markCompleteBtn = document.getElementById('markCompleteBtn');

// Fetch and display tasks
const fetchTasks = async () => {
    try {
        const res = await fetch('http://localhost:5000/api/tasks');
        const tasks = await res.json();
        taskList.innerHTML = ''; 

        tasks.forEach(task => {
            const li = document.createElement('li');
        
            const textSpan = document.createElement('span');
            textSpan.textContent = `${task.title} - Due: ${task.dueDate}`;
        
            const statusDropdown = document.createElement('select');
            const statuses = ['pending', 'in-progress', 'complete'];
        
            statuses.forEach(status => {
                const option = document.createElement('option');
                option.value = status;
                option.textContent = status;
                if (task.status === status) {
                    option.selected = true;
                }
                statusDropdown.appendChild(option);
            });

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('task-checkbox');
            checkbox.dataset.taskId = task._id; // Storing the task ID in the checkbox for later use

            // When the checkbox is clicked, update the task as needed
            checkbox.addEventListener('change', () => {
                if (!checkbox.checked) {
                    markCompleteBtn.disabled = false; // Enable the button when a task is selected
                }
            });

            statusDropdown.onchange = async () => {
                try {
                    const updatedTask = { 
                        status: statusDropdown.value,
                        email: task.email // Pass the task's email for sending the email notification
                    };
            
                    await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(updatedTask),
                    });
            
                    li.classList.remove('pending-list', 'in-progress-list', 'complete-list');
            
                    if (statusDropdown.value === 'pending') {
                        li.classList.add('pending-list');
                    }
            
                    if (statusDropdown.value === 'in-progress') {
                        li.classList.add('in-progress-list');
                    }
            
                    if (statusDropdown.value === 'complete') {
                        li.classList.add('complete-list');
                    }
            
                    console.log(`Task status updated to ${statusDropdown.value}`);
                } catch (error) {
                    console.error('Error updating task status:', error);
                }
            };

            const buttonContainer = document.createElement('div');
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.onclick = () => editTask(task._id);
        
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => deleteTask(task._id);
        
            buttonContainer.appendChild(editButton);
            buttonContainer.appendChild(deleteButton);

            if (statusDropdown.value === 'pending') {
                li.classList.add('pending-list');
            }
    
            if (statusDropdown.value === 'in-progress') {
                li.classList.add('in-progress-list');
            }
    
            if (statusDropdown.value === 'complete') {
                li.classList.add('complete-list');
            }
        
            li.appendChild(checkbox);
            li.appendChild(textSpan);
            li.appendChild(statusDropdown);
            li.appendChild(buttonContainer);
        
            taskList.appendChild(li);
        });
        
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
};

// Mark selected tasks as complete
markCompleteBtn.addEventListener('click', async () => {
    const selectedCheckboxes = document.querySelectorAll('.task-checkbox:checked');
    
    if (selectedCheckboxes.length === 0) {
        alert('No tasks selected.');
        return;
    }

    for (const checkbox of selectedCheckboxes) {
        const taskId = checkbox.dataset.taskId;
        const task = document.querySelector(`li[data-task-id='${taskId}']`);
        
        const updatedTask = { 
            status: 'complete',
            // email: task.querySelector('.task-email').textContent, // Assuming you store email somewhere in the li
        };

        // Update the task status
        try {
            await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTask),
            });
            
            task.querySelector('select').value = 'complete'; 
            task.classList.remove('pending-list', 'in-progress-list');
            task.classList.add('complete-list'); 
            
        } catch (error) {
            window.location.reload();
            console.error('Error updating task:', error);
        }
    }
});

// Add a new task
const addTask = async () => {
    if (taskTitleInput.value.trim() && taskDueDateInput.value.trim() && taskEmailInput.value.trim()) {

        const newTask = {
            title: taskTitleInput.value,
            status: taskStatusInput.value,
            dueDate: new Date(taskDueDateInput.value),
            email: taskEmailInput.value
        };

        try {
            const res = await fetch('http://localhost:5000/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTask),
            });

            if (res.ok) {
                taskTitleInput.value = '';
                taskStatusInput.value = 'pending';
                taskDueDateInput.value = '';
                taskEmailInput.value = '';
                fetchTasks();
            } else {
                console.error('Error adding task');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
};

// Edit a task
const editTask = async (taskId) => {
    const newTitle = prompt("Enter new title:");
    const newStatus = prompt("Enter new status (pending, in-progress, complete):");
    const newDueDate = prompt("Enter new due date:");

    const updatedTask = {
        title: newTitle,
        status: newStatus,
        dueDate: newDueDate,
    };

    try {
        await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTask),
        });

        fetchTasks();
    } catch (error) {
        console.error('Error updating task:', error);
    }
};

// Delete a task
const deleteTask = async (taskId) => {
    try {
        await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
            method: 'DELETE',
        });

        fetchTasks();
    } catch (error) {
        console.error('Error deleting task:', error);
    }
};

// Event listener for adding tasks
addTaskButton.addEventListener('click', addTask);

// Initial fetch to load tasks
fetchTasks();

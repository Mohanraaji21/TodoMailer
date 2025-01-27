const addTaskButton = document.getElementById('addTaskBtn');
const taskTitleInput = document.getElementById('taskTitle');
const taskStatusInput = document.getElementById('taskStatus');
const taskDueDateInput = document.getElementById('taskDueDate');
const taskEmailInput = document.getElementById('taskEmail');
const taskList = document.getElementById('taskList');

// Fetch and display tasks
const fetchTasks = async () => {
    try {
        const res = await fetch('http://localhost:5000/api/tasks');
        const tasks = await res.json();
        taskList.innerHTML = ''; // Clear the list before rendering
        tasks.forEach(task => {
            // const li = document.createElement('li');
            // li.textContent = `${task.title} - ${task.status} - Due: ${task.dueDate} `;

            // const buttonContainer = document.createElement('div');
            // const editButton = document.createElement('button');
            // editButton.textContent = 'Edit';
            // editButton.onclick = () => editTask(task._id);

            // const deleteButton = document.createElement('button');
            // deleteButton.textContent = 'Delete';
            // deleteButton.onclick = () => deleteTask(task._id);

            // const br = document.createElement('br');
            // li.appendChild(br);
            // li.appendChild(editButton);
            // li.appendChild(deleteButton);
            // taskList.appendChild(li);

        const li = document.createElement('li');

        const textSpan = document.createElement('span');
        textSpan.textContent = `${task.title} - ${task.status} - Due: ${task.dueDate}`;

        const buttonContainer = document.createElement('div');
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editTask(task._id);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTask(task._id);

        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);


        li.appendChild(textSpan);

        if(task.status=='pending')
        {
            li.classList.add('pending-list');
        }

        if(task.status=='in-progress')
        {
            li.classList.add('in-progress-list');
        }

        if(task.status=='complete')
        {
            li.classList.add('complete-list');
        }
        li.appendChild(buttonContainer);
        taskList.appendChild(li);

        });
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
};

// Add a new task
const addTask = async () => {
    if (taskTitleInput.value.trim() && taskDueDateInput.value.trim() && taskEmailInput.value.trim()) {

        // const rawDate = taskDueDateInput.value; 
        // const formattedDate = new Date(rawDate).toISOString().split('T')[0];

        const newTask = {
            title: taskTitleInput.value,
            status: taskStatusInput.value,
            dueDate: taskDueDateInput.value,
            // dueDate: formattedDate,
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

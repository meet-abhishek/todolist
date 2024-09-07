import { Task, createTaskElement } from './task.js'; // Importing the Task class and createTaskElement function

const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const taskForm = document.querySelector('.task-input-div');

// Fetch tasks from the server
async function fetchTasks() {
    try {
        const response = await fetch('http://localhost:3000/api/tasks');
        const tasks = await response.json();
        console.log(tasks); // Check the structure of the tasks
        tasks.forEach(task => {
            // Make sure to create a new instance of Task when using createTaskElement
            const taskInstance = new Task(task.text);
            taskInstance.completed = task.completed; // Set the completed status
            taskList.appendChild(createTaskElement(taskInstance, updateTask, deleteTask));
        });
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}


// Save task to server
async function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const task = new Task(taskText);
        const response = await fetch('http://localhost:3000/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: taskText })
        });
        const newTask = await response.json();
        taskList.appendChild(createTaskElement(newTask, updateTask, deleteTask));
        taskInput.value = '';
    }
}

// Update task on the server
async function updateTask(task) {
    await fetch(`http://localhost:3000/api/tasks/${task._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: task.completed })
    });
}

// Delete task from server
async function deleteTask(task) {
    await fetch(`http://localhost:3000/api/tasks/${task._id}`, {
        method: 'DELETE'
    });
}

// Load tasks when the page loads
fetchTasks();

// Handle form submission
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTask();
});

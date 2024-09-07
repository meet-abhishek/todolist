// app.js
import { Task, createTaskElement } from './task.js';
import { saveTasks, loadTasks } from './storage.js';

const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const addTaskBtn = document.getElementById('add-task-btn');

// Select the form
const taskForm = document.querySelector('.task-input-div');

// Event listener for form submission
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTask();
});

// Load tasks from local storage and display them
let tasks = loadTasks();
tasks.forEach(task => {
    taskList.appendChild(createTaskElement(task, saveAllTasks, deleteTask));
});

function saveAllTasks() {
    saveTasks(tasks);
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const newTask = new Task(taskText);
        tasks.push(newTask);
        taskList.appendChild(createTaskElement(newTask, saveAllTasks, deleteTask));
        taskInput.value = '';
        saveAllTasks();
    }
}

function deleteTask(taskToDelete) {
    tasks = tasks.filter(task => task !== taskToDelete);
    saveAllTasks();
}

// Event Listener for pressing Enter key in input field
taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

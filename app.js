// app.js
import { Task, createTaskElement } from './task.js';
import { saveTasks, loadTasks } from './storage.js';

const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const addTaskBtn = document.getElementById('add-task-btn');

let tasks = loadTasks();
tasks.forEach(task => {
    taskList.appendChild(createTaskElement(task, saveAllTasks, saveAllTasks));
});

function saveAllTasks() {
    saveTasks(tasks);
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const newTask = new Task(taskText);
        tasks.push(newTask);
        taskList.appendChild(createTaskElement(newTask, saveAllTasks, saveAllTasks));
        taskInput.value = '';
        saveAllTasks();
    }
}

// Event Listener for Add Task button
addTaskBtn.addEventListener('click', addTask);

// Press Enter to add a task
taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

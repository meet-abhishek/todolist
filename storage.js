import { Task } from './task.js'; // Make sure to import Task

export function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function loadTasks() {
    try {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        return tasks ? tasks.map(taskData => {
            const task = new Task(taskData.text); // Create a new Task object
            task.completed = taskData.completed; // Set the completed status
            return task;
        }) : []; // Return an empty array if no tasks
    } catch (error) {
        console.error('Failed to load tasks:', error);
        return []; // Return an empty array if there’s an error
    }
}

// storage.js
export function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    return tasks ? tasks.map(task => Object.assign(new Task(task.text), task)) : [];
}

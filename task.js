export class Task {
    constructor(text) {
        this.text = text;
        this.completed = false;
    }

    toggleComplete() {
        this.completed = !this.completed;
    }
}

export function createTaskElement(task, onComplete, onDelete) {
    console.log(task);
    const taskItem = document.createElement('li');
    taskItem.textContent = task.text;

    // Button to mark task as complete
    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Complete';
    completeBtn.addEventListener('click', () => {
        task.toggleComplete();  // Toggle the completion status
        taskItem.classList.toggle('completed');  // Update the UI
        onComplete(task);  // Call the onComplete function, passing the task
    });

    // Button to delete the task
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        taskItem.remove();  // Remove the task from the DOM
        onDelete(task);  // Call the onDelete function, passing the task
    });

    taskItem.appendChild(completeBtn);
    taskItem.appendChild(deleteBtn);

    // Set the completed class if the task is completed
    if (task.completed) {
        taskItem.classList.add('completed');
    }

    return taskItem;
}

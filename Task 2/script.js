// Select elements
const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

// Add task
addTaskButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText === "") return alert("Please enter a task!");

    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";
    renderTasks();
});

// Render tasks
function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        const span = document.createElement("span");
        span.textContent = task;

        // Edit button
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => {
            const newTask = prompt("Edit task:", task);
            if (newTask !== null && newTask.trim() !== "") {
                tasks[index] = newTask.trim();
                localStorage.setItem("tasks", JSON.stringify(tasks));
                renderTasks();
            }
        });

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        });

        li.appendChild(span);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}

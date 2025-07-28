const tasks = [
    // { title: "Design a website", completed: true },
    // { title: "Learn JavaScript", completed: false },
    // { title: "Build a Todo App", completed: true },
];

const taskList = document.querySelector("#task-list");
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const main = document.getElementsByTagName("main");

function handleTaskActions(e) {
    const taskItem = e.target.closest(".task-item");
    const taskIndex = +taskItem.getAttribute("task-index");
    const task = tasks[taskIndex];

    // Click Edit
    if (e.target.closest(".edit")) {
        let newTitle = prompt("Enter the new task title:", task.title);

        if (newTitle === null) return;

        newTitle = newTitle.trim();

        if (!newTitle) {
            return alert("Task title cannot be empty!");
        }

        task.title = newTitle;
        renderTasks();
        return;
    }

    // Click done
    if (e.target.closest(".done")) {
        task.completed = !task.completed;
        renderTasks();
        return;
    }

    // Click delete
    if (e.target.closest(".delete")) {
        if (confirm(`Are you sure you want to delete "${task.title}"`)) {
            tasks.splice(taskIndex, 1);
            renderTasks();
        }
    }
}

function addTask(e) {
    e.preventDefault();

    const value = todoInput.value.trim();

    if (!value) {
        return alert("Please write something!");
    }

    tasks.push({
        title: `${value}`,
        completed: false,
    });
    renderTasks();
    todoInput.value = "";
}

function renderTasks() {
    if (!tasks.length) {
        taskList.innerHTML = `<li class="empty-message">No tasks available</li>`;
        return;
    }

    const html = tasks
        .map(
            (task, index) => `
    <li class="task-item ${
        task.completed ? "completed" : ""
    }" task-index = ${index}>
        <span class="task-title">${task.title}</span>
        <div class="task-action">
            <button class="task-btn edit">Edit</button>
            <button class="task-btn done">${
                task.completed ? "Mark as undone" : "Mark as done"
            }</button>
            <button class="task-btn delete">Delete</button>
        </div>
    </li>
`
        )
        .join("");
    taskList.innerHTML = html;
}

todoForm.addEventListener("submit", addTask);
taskList.addEventListener("click", handleTaskActions);

renderTasks();

const tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];

const taskList = document.querySelector("#task-list");
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const main = document.getElementsByTagName("main");

function isDuplicateTask(newTitle, excludeIndex = -1) {
    const isDuplicate = tasks.some(
        (task, index) =>
            task.title.toUpperCase() === newTitle.toUpperCase() &&
            excludeIndex !== index
    );
    return isDuplicate;
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function normalizeTitle(title) {
    return title
        .split(" ")
        .filter((word) => word !== "")
        .join(" ");
}

function handleTaskActions(e) {
    const taskItem = e.target.closest(".task-item");
    const taskIndex = +taskItem.getAttribute("task-index");
    const task = tasks[taskIndex];

    // Click Edit
    if (e.target.closest(".edit")) {
        let newTitle = prompt("Enter the new task title:", task.title);

        if (newTitle === null) return;

        newTitle = normalizeTitle(newTitle);

        if (!newTitle) {
            return alert("Task title cannot be empty!");
        }

        // const isDuplicate = tasks.some(
        //     (task, index) =>
        //         task.title.toUpperCase() === newTitle.toUpperCase() &&
        //         taskIndex !== index
        // );

        if (isDuplicateTask(newTitle, taskIndex)) {
            return alert(
                "Task with this title already exists! Please use a different title."
            );
        }

        task.title = newTitle;
        renderTasks();
        saveTasks();
        return;
    }

    // Click done
    if (e.target.closest(".done")) {
        task.completed = !task.completed;
        renderTasks();
        saveTasks();
        return;
    }

    // Click delete
    if (e.target.closest(".delete")) {
        if (confirm(`Are you sure you want to delete "${task.title}"`)) {
            tasks.splice(taskIndex, 1);
            renderTasks();
            saveTasks();
        }
    }
}

function addTask(e) {
    e.preventDefault();

    const value = normalizeTitle(todoInput.value);

    if (!value) {
        return alert("Please write something!");
    }

    // const isDuplicate = tasks.some(
    //     (task) => task.title.toUpperCase() === value.toUpperCase()
    // );

    if (isDuplicateTask(value)) {
        return alert(
            "Task with this title already exists! Please use a different title."
        );
    }

    tasks.push({
        title: `${value}`,
        completed: false,
    });
    renderTasks();
    saveTasks();
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
    }" task-index = "${index}">
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

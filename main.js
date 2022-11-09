const todoForm = document.querySelector(".todo-form");
const todoList = document.querySelector(".todo-list");
const totalTasks = document.querySelector(".total-tasks span");
const completedTasks = document.querySelector(".completed-tasks span");
const remainingTasks = document.querySelector(".remaining-tasks span");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

if (localStorage.getItem("tasks")) {
    tasks.map((task) => {
        createTask(task);
    });
}

// submit form
todoForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const input = this.name;
    const inputValue = input.value;

    if (inputValue != "") {
        const task = {
            id: new Date().getTime(),
            name: inputValue,
            isCompleted: false
        };

        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        createTask(task);
        todoForm.reset();
    }
    input.focus();
});

// remove task
todoList.addEventListener("click", (e) => {
    if (
        e.target.classList.contains("remove-task") ||
        e.target.parentElement.classList.contains("remove-task")
    ) {
        const taskId = e.target.closest("li").id;
        removeTask(taskId);
    }

});

// remove task
function removeTask(taskId) {
    tasks = tasks.filter((task) => task.id !== parseInt(taskId));
    localStorage.setItem("tasks", JSON.stringify(tasks));
    document.getElementById(taskId).remove();
    countTasks();
}

// update task - change status
todoList.addEventListener("input", (e) => {
    const taskId = e.target.closest("li").id;
    updateTask(taskId, e.target);
    // console.log(taskId, e.target)
    countTasks()
});

// prevent new lines with Enter
todoList.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
    }
});

// create task
function createTask(task) {
    const taskEl = document.createElement("li");
    taskEl.setAttribute("id", task.id);
    const taskTemplate = `
    <div class="checkbox-wrapper">
      <input type="checkbox"  name="tasks" ${task.isCompleted ? "checked" : ""}>
      <label></label>
      <span>  ${task.name}</span>
    </div>
    <button class="remove-task">x</button>
  `;
    taskEl.innerHTML = taskTemplate
    todoList.appendChild(taskEl);
    countTasks();
}

// update task
function updateTask(taskId, el) {
    const task = tasks.find((task) => task.id === parseInt(taskId));
    task.isCompleted = !task.isCompleted;
    if (task.isCompleted) {
        el.setAttribute("checked", "");
    } else {
        el.removeAttribute("checked");
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
    countTasks();
}

function countTasks() {
    totalTasks.textContent = tasks.length;
    const completedTasksArray = tasks.filter((task) => task.isCompleted === true);
    completedTasks.textContent = completedTasksArray.length;
    remainingTasks.textContent = tasks.length - completedTasksArray.length;
}

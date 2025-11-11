const addButton = document.querySelector(".form__btn");
const taskInput = document.querySelector(".form__input");
const taskWrapper = document.querySelector(".js--todos-wrapper");
let tasks = [];

function render() {
  taskWrapper.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.classList.add("todo-item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    checkbox.checked = task.checked;
    checkbox.addEventListener("change", () => toggleTask(index));

    const span = document.createElement("span");
    span.textContent = task.text;
    span.classList.add("todo-item__description");
    if (task.checked) span.classList.add("todo-item--checked");

    const del = document.createElement("button");
    del.textContent = "Delete";
    del.classList.add("todo-item__delete");
    del.addEventListener("click", () => deleteTask(index));

    li.append(checkbox, span, del);
    taskWrapper.appendChild(li);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;
  tasks.push({ text, checked: false });
  taskInput.value = "";
  taskInput.focus();
  saveTasks();
  render();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  render();
}

function toggleTask(index) {
  tasks[index].checked = !tasks[index].checked;
  saveTasks();
  render();
}

addButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    event.preventDefault();
    addTask();
  }
});

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  render();
}

window.addEventListener("load", loadTasks);
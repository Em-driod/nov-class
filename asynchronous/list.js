const form = document.querySelector(".task-form");
const input = document.querySelector(".task-input");
const list = document.querySelector(".list");
const empty = document.querySelector(".empty");
const count = document.querySelector(".task-count");

const STORAGE_KEY = "tasks";
let tasks = loadTasks(); // [{ id, text, done }]

function loadTasks() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
        return [];
    }
}

function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function updateStatus() {
    const left = tasks.filter(t => !t.done).length;
    empty.hidden = tasks.length > 0;
    count.textContent = tasks.length ? left + " of " + tasks.length + " left" : "";
}

// Build one task row and append it to the list.
function addToList(task) {
    const li = document.createElement("li");
    li.className = "flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900 p-4";

    const check = document.createElement("input");
    check.type = "checkbox";
    check.checked = task.done;
    check.className = "h-5 w-5 accent-cyan-400";

    const text = document.createElement("span");
    text.textContent = task.text;
    text.className = "flex-1 break-words";

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.textContent = "Delete";
    removeBtn.className = "rounded-lg bg-red-500 px-3 py-2 text-sm font-semibold hover:bg-red-400";

    function paint() {
        text.classList.toggle("line-through", task.done);
        text.classList.toggle("text-slate-500", task.done);
    }
    paint();

    check.addEventListener("change", () => {
        task.done = check.checked;
        paint();
        saveTasks();
        updateStatus();
    });

    removeBtn.addEventListener("click", () => {
        li.remove();
        tasks = tasks.filter(t => t.id !== task.id);
        saveTasks();
        updateStatus();
    });

    li.append(check, text, removeBtn);
    list.appendChild(li);
}

form.addEventListener("submit", event => {
    event.preventDefault();
    const value = input.value.trim();
    if (!value) return;

    const task = { id: Date.now(), text: value, done: false };
    tasks.push(task);
    saveTasks();
    addToList(task);
    updateStatus();
    input.value = "";
    input.focus();
});

// Show saved tasks when the page opens.
tasks.forEach(addToList);
updateStatus();

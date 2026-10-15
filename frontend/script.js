const API = "/api/tasks";
const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const list = document.getElementById("taskLists");

async function loadtasks() {
    const res = await fetch(API);
    const tasks = await res.json();
    list.innerHTML = "";
    tasks.forEach(task => {
        list.innerHTML += `
        <li>
        ${task.title}
        <button onclick="deleteTask(${task.id})">Delete</button>
        </li>`;
    });
    document.getElementById("taskCount").textContent = 
    `${tasks.length} tasks`;
}

form.onsubmit = async e =>{
    e.preventDefault();

    const title = input.value.trim();
    if(!title) return;
    
    await fetch(API,{
        method: "POST",
        headers :{"Content-Type":"application/json"},
        body: JSON.stringify({title})
    });
    input.value="";
    loadtasks();
}

async function deleteTask(id) {
    await fetch(`${API}/${id}`,{method:"DELETE"});
    loadtasks();
    
}
loadtasks();

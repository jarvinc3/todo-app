// constantes y variables para almacenar elementos del DOM y la lista de tareas
const BTN = document.getElementById("btn")
const vent1 = document.getElementById("ventana1")
const vent2 = document.getElementById("ventana2")
const vent3 = document.getElementById("ventana3")
const container = document.getElementById("add-tareas")
const borrarTodo = document.getElementById("deleteBtn")
let tareas = [];
let currentFilter = showAll;

// Eventos para manejar clics en botones y ventanas
BTN.addEventListener("click", addTask)
vent3.addEventListener("click", filterCompleted)
vent2.addEventListener("click", filterUncompleted)
vent1.addEventListener("click", showAll)
borrarTodo.addEventListener("click", deleteAll)

// Función para agregar una nueva tarea a la lista
function addTask() {
    let tarea = document.getElementById("input-box").value;
    if (tarea.trim() === "") {
        return;
    }
    let ob = {valor:tarea, completada:false};
    tareas.push(ob);
    document.getElementById("input-box").value = "";
    showTask(tareas);
}

// Función para mostrar la lista de tareas en la página
function showTask(_tareas) {
    let lista = document.getElementById("list-container");
    lista.innerHTML = "";

    for (let i = 0; i < _tareas.length; i++) {
        let tarea = document.createElement("li");
        let img = document.createElement("img");
        img.src = ""; // Reemplaza "image.png" con la ruta de tu imagen
        img.classList.add("image-class");
        tarea.appendChild(img);
        tarea.appendChild(document.createTextNode(_tareas[i].valor));
        tarea.id = tareas.indexOf(_tareas[i]);
        tarea.addEventListener("click", () => completeTask(tarea.id));

        if(_tareas[i].completada) {
            tarea.classList.add("checked");
            img.classList.add("checked");
            if(currentFilter === filterCompleted) {
                let deleteIcon = document.createElement("i");
                deleteIcon.className = "fa-solid fa-trash";
                deleteIcon.addEventListener("click", (event) => {
                    event.stopPropagation();
                    deleteTask(tarea.id);
                });
                tarea.appendChild(deleteIcon);
            }
        }
        lista.appendChild(tarea);
    }
}

function completeTask(id) {
    let tarea = tareas[id];
    tarea.completada = !tarea.completada;
    let tareaElement = document.getElementById(id);
    tareaElement.classList.toggle("checked");
    let imgElement = tareaElement.querySelector('.image-class');
    imgElement.classList.toggle('checked');

    // Llamar a la función filterCompleted si estamos en la sección "Completed"
    if (currentFilter === filterCompleted) {
        filterCompleted();
    } else {
        currentFilter();
    }
}

// Función para filtrar y mostrar solo las tareas completadas
function filterCompleted() {
    let filtradas = tareas.filter(x => x.completada);
    filtradas.sort((a, b) => tareas.indexOf(a) - tareas.indexOf(b));
    borrarTodo.style.display = "block";
    currentFilter = filterCompleted;
    showTask(filtradas);
    container.style.display = "none";
    vent1.classList.remove("active-tab");
    vent2.classList.remove("active-tab");
    vent3.classList.add("active-tab");
}

function filterUncompleted() {
    let filtradas = tareas.filter(x => !x.completada);
    filtradas.sort((a, b) => tareas.indexOf(a) - tareas.indexOf(b));
    currentFilter = filterUncompleted;
    showTask(filtradas);
    container.style.display = "block";
    borrarTodo.style.display = "none";
    vent1.classList.remove("active-tab");
    vent2.classList.add("active-tab");
    vent3.classList.remove("active-tab");
}

// Función para mostrar todas las tareas (completadas e incompletas)
function showAll() {
    container.style.display = "block";
    currentFilter = showAll;
    showTask(tareas);
    borrarTodo.style.display = "none";
    vent1.classList.add("active-tab");
    vent2.classList.remove("active-tab");
    vent3.classList.remove("active-tab");
}

// Función para borrar todas las tareas completadas
function deleteAll() {
    tareas = tareas.filter(x => !x.completada);
    filterCompleted();
}

// Función para borrar una tarea individualmente
function deleteTask(id) {
    tareas.splice(id, 1);
    currentFilter();
}

showAll()
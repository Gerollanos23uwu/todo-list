const dateNumber = document.getElementById('dateNumber');
const dateText = document.getElementById('dateText');
const dateMonth = document.getElementById('dateMonth');
const dateYear = document.getElementById('dateYear');

const tasksContainer = document.getElementById('tasksContainer');

const setDate = () => {
    const date = new Date();
    dateNumber.textContent = date.toLocaleString('es', { day: 'numeric' });
    dateText.textContent = date.toLocaleString('es', { weekday: 'long' });
    dateMonth.textContent = date.toLocaleString('es', { month: 'short' });
    dateYear.textContent = date.toLocaleString('es', { year: 'numeric' });
};

const addNewTask = event => {
    event.preventDefault();
    const { value } = event.target.taskText;
    if(!value) return;
    const task = document.createElement('div');
    task.classList.add('task', 'roundBorder');
    task.addEventListener('click', changeTaskState)
    task.textContent = value;
    tasksContainer.prepend(task);
    
    // Guardar la tarea en localStorage
    saveTaskToLocalStorage(value);
    
    event.target.reset();
};

const changeTaskState = event => {
    event.target.classList.toggle('done');
};

const order = () => {
    const done = [];
    const toDo = [];
    tasksContainer.childNodes.forEach( el => {
        el.classList.contains('done') ? done.push(el) : toDo.push(el)
    })
    return [...toDo, ...done];
}

const renderOrderedTasks = () => {
    order().forEach(el => tasksContainer.appendChild(el))
}

tasksContainer.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text/plain', event.target.id);
});

function addNewPerson(event) {
    event.preventDefault();
    var personName = event.target.personName.value;
    
    var personsContainer = document.getElementById('personsContainer');
    var newPersonElement = document.createElement('div');
    newPersonElement.textContent = personName;
    personsContainer.appendChild(newPersonElement);
    
    event.target.personName.value = "";
}

// Obtener tareas almacenadas en localStorage
const getTasksFromLocalStorage = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task', 'roundBorder');
        taskElement.addEventListener('click', changeTaskState);
        taskElement.textContent = task;
        tasksContainer.appendChild(taskElement);
    });
};

// Guardar nueva tarea en localStorage
const saveTaskToLocalStorage = (task) => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

setDate();
getTasksFromLocalStorage();
//()localStorage.clear();
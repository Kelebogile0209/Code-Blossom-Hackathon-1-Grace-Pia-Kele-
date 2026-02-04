
console.log("Java is connected");


// This is to get the elements from the Html code
const newTask = document.getElementById('enterTask');
const listOfTasks = document.getElementById('everydayTask');
const addingTaskButton = document.getElementById('addToList');
const errorMessage = document.getElementById('errorMessage');
const dueDate = document.getElementById('enterDueDate');
const searchForTask = document.getElementById('searchButton');


// These are the storage functions to add to the local storage (Graces code)

function loadTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

let tasks = loadTasks();

// This is a function to render tasks

function renderTasks() {
    lisOfTasks.innerHTML = '';

    tasks.forEach((task, index) => {
        const newList = document.createElement('li');

        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        taskText.style.margin = '0 10px';

        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.checked = task.completed;
        checkBox.addEventListener('change', function () {
            task.completed = checkBox.checked;
            saveTasks();
            renderTasks();
        });

        if (task.completed) {
            taskText.style.textDecoration = "line-through";
        }

        const dueDateLabel = document.createElement('small');
        dueDateLabel.textContent = task.dueDate
            ? `Due: ${task.dueDate}`
            : 'No due date';
        dueDateLabel.style.marginLeft = '10px';
        dueDateLabel.style.color = '#555';

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', function () {
            const fixedTask = prompt('Edit your Task', task.text);
            if (fixedTask !== null && fixedTask.trim() !== '') {
                task.text = fixedTask.trim(); // ✅ FIX
                saveTasks();
                renderTasks();
            }
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener('click', function () {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        newList.appendChild(checkBox);
        newList.appendChild(taskText);
        newList.appendChild(editButton);
        newList.appendChild(deleteButton);
        newList.appendChild(dueDateLabel);

        lisOfTasks.appendChild(newList);
    });
}


// This is functionality provided to the adding task

addingTaskButton.addEventListener('click', function (event) {
    event.preventDefault();

    const taskInput = newTask.value.trim();
    const selectedDate = dueDate.value;

    if (taskInput === '') {
        errorMessage.textContent = 'Please enter a task';
        return;
    }

    errorMessage.textContent = '';

    tasks.push({
        text: taskInput,
        dueDate: selectedDate,
        completed: false
    });

    saveTasks();
    renderTasks();

    newTask.value = '';
});

//This is the Event listner for the search button 

searchForTask.addEventListener('click', function (event) {
    event.preventDefault();

    const searchBox = document.getElementById('searchBar');
    const searchTerm = searchBox.value.trim().toLowerCase();
    const resultsContainer = document.getElementById('searchResults');

    resultsContainer.innerHTML = '';

    if (searchTerm === '') {
        resultsContainer.textContent = 'Enter a search term';
        return;
    }

    const results = tasks.filter(task =>
        task.text.toLowerCase().includes(searchTerm)
    );

    if (results.length === 0) {
        resultsContainer.textContent = `No tasks found for "${searchTerm}"`;
        return;
    }

    const heading = document.createElement('h3');
    heading.textContent = `Found ${results.length} result(s):`;
    resultsContainer.appendChild(heading);

    results.forEach(task => {
        const div = document.createElement('div');
        div.className = 'task';
        div.textContent = task.text;
        resultsContainer.appendChild(div);
    });
});

renderTasks();

console.log("Java is connected");
// used to receive the input elements from the HTML 

const newTask = document.getElementById('enterTask');
const lisOfTasks = document.getElementById('everydayTask');
const addingTaskButton = document.getElementById('addToList');
const errorMessage = document.getElementById('errorMessage');
const dueDate = document.getElementById('enterDueDate');
const searchForTask = document.getElementById('searchButton');
let tasks = [];





addingTaskButton.addEventListener('click', function (event) {
    event.preventDefault();
    // error message if the input is empty
    const taskInput = newTask.value;// getting the value of the task from the input box
    const selectedDate = dueDate.value;// getting the value from the calander
    // used to display an error message 
    if (taskInput.trim() === '') {
        errorMessage.textContent = 'Please eneter a task';
    } else {
        errorMessage.textContent = '';

        tasks.push({
            text: taskInput,
            dueDate: selectedDate
        });


        //used to create a new list
        const newList = document.createElement('li');
        const taskText = document.createElement('span');

        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.addEventListener('change', function () {
            taskText.style.textDecoration = checkBox.checked ? "line-through" :
                'none';
        });


        const dueDateLabel = document.createElement('small'); // This creates a small label for the due date to be displayed 
        dueDateLabel.textContent = selectedDate ? `Due: ${selectedDate}` :
            'No due date available';
        dueDateLabel.style.marginLeft = '10px';
        dueDateLabel.style.color = '#555';


        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', function () {
            const fixedTask = prompt('Edit your Task', taskText.textContent);
            if (fixedTask !== null && fixedTask.trim() !== '') {
                taskText.textContent = fixedTask.trim();
            }
        })
        taskText.textContent = taskInput;
        taskText.style.margin = '0 10px';
        // this is the adding a new delete/ edit button once we add a new task
        const deleteButton = document.createElement('Button');
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener('click', function () {
            lisOfTasks.removeChild(newList)
        });


        //  newList.textContent = taskInput;
        newList.appendChild(taskText);
        newList.appendChild(checkBox);
        newList.appendChild(editButton);
        newList.appendChild(deleteButton);
        newList.appendChild(dueDateLabel);
        // Add the task to the list
        lisOfTasks.appendChild(newList);
        newTask.value = '';
    }


});


// EventListner  created for the search bar 


searchForTask.addEventListener('click', function (event) {
    event.preventDefault()

    const searchBox = document.getElementById('searchBar');
    const searchTerm = searchBox.value.trim();
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '';

    if (searchTerm === '') {
        resultsContainer.innerHTML = 'Enter a search term';
        return;
    }

    const results = tasks.filter(task =>
        task.text.toLowerCase().includes(searchTerm.toLowerCase())
    );


    if (results.length === 0) {
        resultsContainer.innerHTML = `No tasks found for "${searchTerm}"`;
        return;
    }

    results.forEach(task => {
        const div = document.createElement('div');
        div.className = 'task';
        div.textContent = task.text;
        resultsContainer.appendChild(div);
    });

});


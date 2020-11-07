//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
document.addEventListener('DOMContentLoaded', getTodos);

//functions

function addTodo(event) {

    event.preventDefault();
    //todo DIV
    const todoDIV = document.createElement("div");
    todoDIV.classList.add("todo");

    //create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDIV.appendChild(newTodo);
    //adding it to the storage
    saveLocalTodos(todoInput.value);

    //CHECK BUTTON
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>'
    completeButton.classList.add("complete-btn");
    todoDIV.appendChild(completeButton);

    //TRASH BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add("trash-btn");
    todoDIV.appendChild(trashButton);

    //APPEND TO LIST
    todoList.appendChild(todoDIV);

    //clear the text
    todoInput.value = "";
}
function deleteCheck(e) {
    const item = e.target;

    //delete todo
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodo(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        })

    }

    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;

    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "complete":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    //check if its already there
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))


    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));

}

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(function (todo) {
        //todo DIV
        const todoDIV = document.createElement("div");
        todoDIV.classList.add("todo");

        //create LI
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDIV.appendChild(newTodo);


        //CHECK BUTTON
        const completeButton = document.createElement('button');
        completeButton.innerHTML = '<i class="fas fa-check"></i>'
        completeButton.classList.add("complete-btn");
        todoDIV.appendChild(completeButton);

        //TRASH BUTTON
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add("trash-btn");
        todoDIV.appendChild(trashButton);

        //APPEND TO LIST
        todoList.appendChild(todoDIV);
    })
}

function removeLocalTodo(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
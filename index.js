let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Render the todos when the page loads
render();

// Add event listener for Enter key
document.querySelector("input").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    addTodo();
  }
});

function addTodo() {
  const input = document.querySelector("input");
  if (input.value.trim() !== "") { // Only add if input is not empty
    todos.push({ title: input.value });
    input.value = ""; // Clear the input box after adding a todo
    saveTodos();
    render();
  }
}

function deleteLastTodo() {
  todos.splice(todos.length - 1, 1);
  saveTodos();
  render();
}

function deleteFirstTodo() {
  todos.splice(0, 1);
  saveTodos();
  render();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  render();
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function createTodoComponent(todo, index) {
  const div = document.createElement("div");
  div.className = "todo-item"; // Apply the .todo-item class
  
  const h1 = document.createElement("h1");
  h1.style.flex = "1"; // Allow the text to take up available space
  h1.innerHTML = todo.title;
  
  const button = document.createElement("button");
  button.className = "delete-btn"; // Apply delete button styling
  button.innerHTML = "Delete";
  button.onclick = function() {
    deleteTodo(index);
  };

  div.append(h1);
  div.append(button);
  return div;
}

function render() {
  document.querySelector("#todos").innerHTML = "";
  for (let i = 0; i < todos.length; i++) {
    const element = createTodoComponent(todos[i], i);
    document.querySelector("#todos").appendChild(element);
  }
}

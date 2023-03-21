
const form = document.querySelector("[data-form]")
const lists = document.querySelector("[data-lists]")
const input = document.querySelector("[data-input]")

// save in local storage
class Storage {

    // set storage
    static addTodoStorage(todoArray){
        let storage = localStorage.setItem("todo", JSON.stringify(todoArray));
        return storage;
    }
    // get storage
    static getStorage(){
        let storage = localStorage.getItem("todo") === null ? [] : JSON.parse(localStorage.getItem("todo"));
        return storage;
    }
}


let todoArray = Storage.getStorage();

/** form  */
form.addEventListener("submit", (e) => {
    e.preventDefault();

    // create random id
    let id = Math.random() * 100000;

    // initiate todo object
    const todo = new Todo(id, input.value);

    // store todo object in empty array
    todoArray = [...todoArray, todo];

    // display todo oobject in dom
    UI.displayData();
    // clear input
    UI.clearInput();
    // Remove todo
    UI.removeTodo();

    // save in locastorage
    Storage.addTodoStorage(todoArray);


    // console.log(todoArray)
});



/** todo object */

class Todo{
    constructor(id, todo){
            this.id = id;
            this.todo = todo;
            // console.log(this.todo)
    }
}

/** Display todo Object */

class UI{

    // display todo 
        static displayData(){
            let displayData = todoArray.map((item) => {
                return ` <div class="todo">
                <p>${item.todo}</p>
                <span class='bx bx-trash remove' data-id=${item.id}></span>
              </div>`
            });

            lists.innerHTML = (displayData).join(" ");
        }

        // clear input

        static clearInput(){
            input.value = "";
        }

    // delete todo 
     static removeTodo(){
        lists.addEventListener("click", (e) => {
            if(e.target.classList.contains('remove'));
            e.target.parentElement.remove();
      
            let btnId = e.target.dataset.id;
            // remove from arry 
            UI.removeArrayTodo(btnId);
        })
     }

    // remove todo from array

    static removeArrayTodo(id){
        todoArray = todoArray.filter((item) => item.id !== +id);
        Storage.addTodoStorage(todoArray);

    }
}

window.addEventListener("DOMContentLoaded", () => {
    UI.displayData();
    UI.removeTodo();
});

// console.log(input.value)
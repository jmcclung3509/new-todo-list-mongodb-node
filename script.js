let listCont = document.querySelector(".list-container");
let inputEl = document.querySelector(".form-control")
const addBtn = document.querySelector(".addBtn");
const clearAllBtn = document.getElementById("remove-all")
const list = document.querySelector("ol");
const noList = document.querySelector(".no-list")
// const chkBtn = document.getElementById()


addBtn.addEventListener("click", function (e) {
    e.preventDefault();
    noList.classList.add("hide");


    let inputValue = inputEl.value.trim();
    if (inputValue === "") {
        alert("Please enter an item")
    } else {
        addItem(inputValue)
        saveTodo(inputValue)
    }
    clearText()
})

function clearText() {
    inputEl.value = "";
}

// clearAllBtn.addEventListener("click", function () {

//     noList.classList.remove("hide");
//     list.innerHTML = ""
// })

function addItem(item) {

    if (item.length = 0) {
        alert("Please enter a todo item")
    } else {
        noList.classList.add("hide")


        let li = document.createElement("li")
        li.innerHTML = `${item}`
        list.append(li)

        let deleteBtn = document.createElement("button")
        deleteBtn.innerHTML = "X"
        deleteBtn.setAttribute("class", "deleteBtn")
        li.appendChild(deleteBtn)
        deleteBtn.onclick = (e) => {
            deleteTodo(e)
            deleteItem(e)
        }
    }
}
async function saveTodo(item) {


    const link = "http://localhost:3001/todo"


    const postSettings = {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: item, done: false })
    }
    const postTodoResp = await fetch(link, postSettings)
    const data = await postTodoResp.json()
    console.log(data)
}
async function deleteTodo(id) {
    console.log("click")
    const link = "http://localhost:3001/todo"

    const deleteSettings = {
        method: "delete",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    const response = await fetch(link, deleteSettings);
    const data = await response.json()
    console.log(data)

}





function deleteItem(e) {
    console.log("click")
    let item = e.target.parentNode
    console.log(item)

    item.remove()


}


async function loadTodo() {
    const options = {
        method: "GET",
    };
    const link = "http://localhost:3001/todo"
    const response = await fetch(link);
    const data = await response.json()

    if (data) {
        noList.classList.add("hide");
        let todoData = data.forEach((item) => {

            let id = item.id
            let text = item.text
            let done = item.done


            let todoItem = document.createElement("li")
            todoItem.innerHTML = `${text}`
            list.appendChild(todoItem)

            let deleteBtn = document.createElement("button")
            deleteBtn.innerHTML = "X"
            deleteBtn.setAttribute("class", "deleteBtn")
            todoItem.appendChild(deleteBtn)
            deleteBtn.onclick = (e) => {
                deleteTodo(e)
                deleteItem(e)
            }



        })
    }
}



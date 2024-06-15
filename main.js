let task_input = document.getElementById("task-input");
let ulEl = document.querySelector("ul");

function displayTask() {
    let storedarr = JSON.parse(localStorage.getItem("todo")) || []
    console.log(storedarr)
    storedarr.forEach(function(element) {
        LoadTasks(element)
        console.log(element)

    })


}
displayTask()

function LoadTasks(element) {
    if (element != undefined) {

        let liEl = document.createElement("li");
        let inputbox = document.createElement("input")
        inputbox.type = "text";
        inputbox.value = element
        inputbox.className = "input-class";
        inputbox.setAttribute("readonly", "true");
        let buttonEl = document.createElement("button")
        buttonEl.textContent = "EDIT";

        let checkbox = document.createElement("input");
        checkbox.className = "tasks-selected";
        checkbox.type = "checkbox";



        liEl.appendChild(checkbox)
        liEl.appendChild(inputbox);
        liEl.appendChild(buttonEl)
        ulEl.appendChild(liEl);

        buttonEl.addEventListener("click", () => {
            editTask(inputbox)
        })

    }

}
LoadTasks()

function addTask() {
    if (task_input.value == "") {
        alert("Please Enter a task");
    } else {
        let liEl = document.createElement("li");
        let taskEl = document.createTextNode(task_input.value);
        let checkbox = document.createElement("input");
        checkbox.className = "tasks-selected";
        checkbox.type = "checkbox";
        let inputboxtask = document.createElement("input");
        inputboxtask.type = "text";
        inputboxtask.className = "input-class";
        inputboxtask.value = taskEl.textContent;
        inputboxtask.setAttribute("readonly", "true");
        let editbut = document.createElement("button");
        editbut.textContent = "Edit";

        let todos = JSON.parse(localStorage.getItem("todo")) || []
        todos.push(task_input.value)
        localStorage.setItem("todo", JSON.stringify(todos))


        liEl.appendChild(checkbox);
        liEl.appendChild(inputboxtask);
        liEl.appendChild(editbut);
        ulEl.appendChild(liEl);



        editbut.addEventListener("click", function() {
            editTask(inputboxtask)
        })

        task_input.value = "";

    }
}


function editTask(inputboxtask) {
    inputboxtask.removeAttribute("readonly");
    inputboxtask.focus();
    let editList = JSON.parse(localStorage.getItem("todo")) || [];
    let inputvalue = inputboxtask.value
    for (let i = 0; i < editList.length; i++) {
        if (inputvalue == editList[i]) {

            inputboxtask.addEventListener("keypress", (event) => {
                if (event.key === "Enter") {
                    inputboxtask.value = inputboxtask.value
                    inputboxtask.setAttribute("readonly", "true");
                    editList[i] = inputboxtask.value;
                    localStorage.setItem("todo", JSON.stringify(editList))

                }
            })

        }


    }
    inputboxtask.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            inputboxtask.value = inputboxtask.value;
            inputboxtask.setAttribute("readonly", "true");
        }
    })
}

function deleteitems() {
    let checkboxes = document.querySelectorAll(".tasks-selected");
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {

            let listitem = checkbox.parentNode
            listitem.remove();
            let todorem = JSON.parse(localStorage.getItem("todo"));
            let tasktext = listitem.textContent.trim();

            let index = todorem.findIndex(task => task === tasktext)
            if (index != 1) {
                todorem.splice(index, 1);
            }



            localStorage.setItem("todo", JSON.stringify(todorem))


        }
    })

}
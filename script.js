const createListBtnEl = document.getElementById("create-list-btn"); 

const listInputEl = document.getElementById('list-input'); 

const listComponentEl = document.getElementById('list-component'); 

const listRenderEl = document.getElementById('list-render'); 

const taskInputEl = document.getElementById("task-input"); 

const addBtnEl = document.getElementById('add-btn'); 

const taskListEl = document.getElementById('task-list'); 

const taskComponentEl = document.getElementById('task-component'); 


const todoApp = (
    function (){
        let lists = [
            {
                id: 1,
                listName: "morning routine",
                tasks: [
                    {
                        taskId: 1,
                        task: "morning walk",
                        isDone: false,
                    },
                    {
                        taskId: 2,
                        task: "reading newspaper",
                        isDone: false,
                    },
                ],
            },
            {
                id: 2,
                listName: "grocery list",
                tasks: [
                    {
                        taskId: 1,
                        task: "milk",
                        isDone: false,
                    },
                    {
                        taskId: 2,
                        task: "eggs",
                        isDone: false,
                    },
                ],
            },
        ];

        let updateList = (listId, listInput) => {
            lists.forEach((list) => {
                if (list.id == listId) {
                    list.listName = listInput;
                }
            }); 

            todoApp.viewLists(); 
        }
        
        let deleteList = (listId) => {
            let listIndex = lists.findIndex(list => list.id == listId);
            if (lists[listIndex].tasks.length !== 0) {
                todoApp.displayList(listId); 
                alert('Please delete all tasks in this list.'); 
            }
            else {
                lists.splice(listIndex, 1);  
            }
            
            todoApp.viewLists(); 
        }

        let updateTask = (listId, taskId, taskInput) => {
            let listIndex = lists.findIndex(list => list.id == listId); 

            lists[listIndex].tasks.forEach(task => {
                if(task.taskId == taskId){
                    task.task = taskInput; 
                }
            }); 

            todoApp.displayList(listId); 
        }

        let deleteTask = (listId, taskId) => {
            let listIndex = lists.findIndex(list => list.id == listId); 
            let taskIndex = lists[listIndex].tasks.findIndex(task => task.taskId == taskId); 

            lists[listIndex].tasks.splice(taskIndex, 1); 

            todoApp.displayList(listId); 
        }

        let toggleTaskStatus = (listId, taskId) => {
            let listIndex = lists.findIndex(list => list.id == listId); 
            let taskIndex = lists[listIndex].tasks.findIndex(task => task.taskId == taskId); 

            let isDoneValue = lists[listIndex].tasks[taskIndex].isDone; 
        
            lists[listIndex].tasks[taskIndex].isDone = !isDoneValue; 

            todoApp.displayList(listId); 
        }

        return {
            createList(listInput){
                let listObj = {}; 
                listObj.id = lists.length+1; 
                listObj.listName = listInput; 
                listObj.tasks = [];
                lists.push(listObj); 
                
                taskComponentEl.style.display = "block";
                todoApp.viewLists(listObj.id); 

                return listObj.id; 
            },

            viewLists(listId=0){
                listRenderEl.innerHTML = ""; 

                lists.map(list => {
                    let listDiv = document.createElement('div'); 
                    let listEl = document.createElement("li");
                    let listNameEl = document.createElement("p");
                    listDiv.setAttribute("id", list.id);
                    listNameEl.textContent = list.listName;

                    let editIcon = document.createElement("button");
                    let delIcon = document.createElement("button");

                    if(list.id == listId){
                        listEl.classList.add('active'); 
                    }

                    listDiv.style.cursor = "pointer"; 
                    listEl.classList.add('list-group-item', 'd-flex', 'align-items-center', 'focus');
                    listNameEl.classList.add('fs-4', 'm-0', 'me-auto'); 

                    editIcon.classList.add('btn', 'btn-info', 'me-2'); 
                    editIcon.innerHTML = `<i class="fa-solid fa-pencil"></i>`;  
                    
                    delIcon.innerHTML = `<i class="fa-solid fa-trash-can"></i>`; 
                    delIcon.classList.add('btn', 'btn-danger'); 

                    listEl.append(listNameEl, editIcon, delIcon); 
                    listDiv.append(listEl);
                    listRenderEl.appendChild(listDiv);
                    listInputEl.value = ""; 
                    console.log(listEl.parentElement); 
                    
                    editIcon.addEventListener('click', () => {
                        let listInput = prompt("Update List Name: ", list.listName);
                        if (listInput.length == 0){
                            alert('Please enter a valid List Name.'); 
                        }
                        else {
                            updateList(list.id, listInput);   
                        }
                    }); 

                    delIcon.addEventListener("click", () => {
                        deleteList(list.id); 
                    }); 
                }); 
            }, 

            displayList(listId){
                taskListEl.innerHTML = "";
                lists.filter(list => list.id == listId)[0].tasks.map(task => {
                    let taskDiv = document.createElement('div'); 
                    let taskContainerEl = document.createElement("li");
                    let checkBoxEl = document.createElement('input'); 
                    let taskEl = document.createElement("p");
                    let editIcon = document.createElement("button");
                    let delIcon = document.createElement("button");

                    taskContainerEl.classList.add('list-group-item', 'd-flex', 'align-items-center'); 
                    taskEl.classList.add('me-auto', 'fs-5', 'm-0'); 
                    checkBoxEl.setAttribute("type", "checkbox"); 
                    checkBoxEl.checked = task.isDone; 
                    checkBoxEl.classList.add('me-2'); 
                    editIcon.classList.add("btn", "btn-info", 'me-2');
                    editIcon.innerHTML = `<i class="fa-solid fa-pencil"></i>`;
                    delIcon.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
                    delIcon.classList.add("btn", "btn-danger"); 

                    taskDiv.setAttribute('id', task.taskId); 
                    taskEl.textContent = task.task; 
                    taskContainerEl.append(
                        checkBoxEl, 
                        taskEl,
                        editIcon,
                        delIcon
                    );
                    taskDiv.appendChild(taskContainerEl); 
                    taskListEl.appendChild(taskDiv);

                    checkBoxEl.addEventListener("click", () => {
                        toggleTaskStatus(listId, task.taskId); 
                    })

                    editIcon.addEventListener("click", () => {
                        let taskInput = prompt("Edit your task", task.task); 
                        if (taskInput.length === 0){
                            alert("Please a valid task."); 
                        }
                        else {
                            updateTask(listId, task.taskId, taskInput); 
                        }
                    });

                    delIcon.addEventListener("click", () => {
                        deleteTask(listId, task.taskId); 
                    }); 
                }); 
            },

            addTask(listId, taskInput){
                let listIndex = lists.findIndex(list => list.id == listId); 
                let taskObj = {}; 
                taskObj.id = lists[listIndex].tasks.length+1; 
                taskObj.task = taskInput; 
                taskObj.isDone = false; 
                lists[listIndex].tasks.push(taskObj); 

                todoApp.displayList(listId); 
            }
        };
    }
)(); 

let listId; 

todoApp.viewLists(); 

createListBtnEl.addEventListener('click', () => {
    if (listInputEl.value.length > 0){
        listId = todoApp.createList(listInputEl.value);
        todoApp.displayList(listId);  
        listInputEl.value = ""; 
    }
}); 

listRenderEl.addEventListener('click', (event) => {
    listId = event.target.parentElement.id;
    taskComponentEl.style.display = "block";
    let selectedElement = document.querySelector('.active');
    if (selectedElement) {
        selectedElement.classList.remove('active'); 
    }
    todoApp.viewLists(listId); 
    todoApp.displayList(listId);  
}); 

addBtnEl.addEventListener("click", () => {
    if (taskInputEl.value.length > 0){
        todoApp.addTask(listId, taskInputEl.value); 
        taskInputEl.value = ""; 
    }
}); 

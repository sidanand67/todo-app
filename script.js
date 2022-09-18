const createListBtnEl = document.getElementById("create-list-btn"); 

const listInputEl = document.getElementById('list-input'); 

const listComponentEl = document.getElementById('list-component'); 

const listRenderEl = document.getElementById('list-render'); 

const taskInputEl = document.getElementById("task-input"); 

const addBtnEl = document.getElementById('add-btn'); 

const itemListEl = document.getElementById('item-list'); 

const taskComponentEl = document.getElementById('task-component'); 


const todoApp = (
    function (){
        // let lists = localStorage.getItem('lists') === null 
        //             ? 
        //             localStorage.setItem('lists', JSON.stringify([])) 
        //             : 
        //             JSON.parse(localStorage.getItem('lists')); 

        let lists = [
            {
                id: 1,
                listName: "hello",
                tasks: [
                    {
                        taskId: 1,
                        task: "walk",
                        isDone: false
                    },
                    {
                        taskId: 2,
                        task: "morning",
                        isDone: false
                    },
                ],
            },
            {
                id: 2,
                listName: "grocery",
                tasks: [
                    {
                        taskId: 1,
                        task: "mango",
                        isDone: false 
                    },
                    {
                        taskId: 2,
                        task: "apple",
                        isDone: false 
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
            lists.splice(listIndex, 1);  
            
            todoApp.viewLists(); 
        }

        return {
            createList(listInput){
                let listObj = {}; 
                listObj.id = lists.length+1; 
                listObj.listName = listInput; 
                listObj.tasks = [];
                lists.push(listObj); 
                
                todoApp.viewLists(); 
            },

            viewLists(){
                listRenderEl.innerHTML = ""; 
                lists.map(list => {
                    let listEl = document.createElement("li");
                    let listNameEl = document.createElement("span");
                    listEl.setAttribute("id", list.id);
                    listNameEl.textContent = list.listName;

                    let editIcon = document.createElement("i");
                    let delIcon = document.createElement("i");

                    editIcon.classList.add("fa-solid", "fa-pen");
                    delIcon.classList.add("fa-solid", "fa-trash");

                    listEl.append(listNameEl, editIcon, delIcon);
                    listRenderEl.append(listEl);
                    listInputEl.value = ""; 

                    editIcon.addEventListener('click', (event) => {
                        let listContent = event.target.previousElementSibling;
                        let listId = event.target.parentElement.id; 
                        
                        let listInput = prompt("Edit List Name: "); 

                        updateList(listId, listInput); 
                    }); 

                    delIcon.addEventListener("click", (event) => {
                        let listId = event.target.parentElement.id; 

                        deleteList(listId); 
                    }); 
                }); 
            }, 

            displayList(listId){
                itemListEl.innerHTML = ""; 
                lists.filter(list => list.id == listId)[0].listContent.map(list => {
                    let itemContainerEl = document.createElement("li");
                    let itemEl = document.createElement("span");
                    let editIcon = document.createElement("i");
                    let delIcon = document.createElement("i");

                    editIcon.classList.add("fa-solid", "fa-pen");
                    delIcon.classList.add("fa-solid", "fa-trash");
                    
                    itemContainerEl.setAttribute('id', list.taskId); 
                    itemEl.textContent = list.task; 
                    itemContainerEl.append(
                        itemEl,
                        editIcon,
                        delIcon
                    );
                    itemListEl.appendChild(itemContainerEl);

                    // editIcon.addEventListener("click", (event) => {
                    //     let itemContent = event.target.previousElementSibling;
                    //     inputEl.value = itemContent.textContent;
                    //     lists[listId - 1].listContent.splice(itemContent.id, 1);
                    //     event.target.parentElement.remove();
                    // });

                    // delIcon.addEventListener("click", (event) => {
                    //     let itemId = event.target.parentElement.id;
                    //     let result = lists.filter(list => list.id == listId)[0].listContent.filter(task => task.taskId == itemId);
                    //     itemContainerEl.remove();
                    // }); 
                }); 
                return listId; 
            },

            addItem(listId){
                let itemObj = {}; 
                // itemObj.taskId = 
                itemObj.task = taskInputEl.value; 
                itemObj.isDone = false; 
                lists.filter(list => list.id == listId)[0].listContent.push(itemObj); 
                taskInputEl.value=""; 
                this.displayList(listId); 
            }, 

            toggleItemStatus(event){
                if(event.target.tagName === 'SPAN'){
                    event.target.classList.toggle('checked'); 
                }
            }, 
        };
    }
)(); 

let listId; 

todoApp.viewLists(); 

createListBtnEl.addEventListener('click', () => {
    if (listInputEl.value.length > 0){
        todoApp.createList(listInputEl.value); 
        listInputEl.value = ""; 
    }
}); 

listRenderEl.addEventListener('click', (event) => {
    listId = todoApp.displayList(event.target.id);  
}); 

addBtnEl.addEventListener("click", () => {
    todoApp.addItem(listId); 
}); 

itemListEl.addEventListener("click", todoApp.toggleItemStatus); 
const createBtnEl = document.getElementById("create-btn"); 

const listNameEl = document.getElementById('list-name'); 

const listComponentEl = document.getElementById('list-component'); 

const listRenderEl = document.getElementById('list-render'); 

const inputEl = document.getElementById("user-input"); 

const addBtnEl = document.getElementById('add-btn'); 

const itemListEl = document.getElementById('item-list'); 

const taskComponentEl = document.getElementById('task-component'); 


const todoApp = (
    function (){
        let lists = localStorage.getItem('lists') === null 
                    ? 
                    localStorage.setItem('lists', JSON.stringify([])) 
                    : 
                    JSON.parse(localStorage.getItem('lists')); 

        return {
            createList(){
                let listObj = {}; 
                listObj.id = lists.length+1; 
                listObj.listName = listNameEl.value; 
                listObj.listContent = []; 
                
                lists.push(listObj); 
                localStorage.setItem("lists", JSON.stringify(lists)); 

                let listBtnEl = document.createElement('li'); 
                listBtnEl.textContent = listNameEl.value; 
                listBtnEl.setAttribute('id', listObj.id); 

                listRenderEl.appendChild(listBtnEl); 
                listNameEl.value = ""; 
            }, 

            displayList(event){
                listComponentEl.style.display = "none"; 
                taskComponentEl.style.display = "block"; 
                return event.target.id; 
            },

            addItem(listId){
                let itemContainerEl = document.createElement("li");
                let itemEl = document.createElement('span');  
                let editIcon = document.createElement("i"); 
                let delIcon = document.createElement('i'); 

                itemEl.setAttribute('id', lists[listId-1].listContent.length.toString());  

                editIcon.classList.add('fa-solid', 'fa-pen'); 
                delIcon.classList.add("fa-solid", "fa-trash"); 

                editIcon.addEventListener("click", (event) => {
                    let itemContent = event.target.previousElementSibling;
                    inputEl.value = itemContent.textContent; 
                    lists[listId-1].listContent.splice(itemContent.id, 1); 
                    event.target.parentElement.remove();
                }); 

                delIcon.addEventListener("click", (event) => {
                    let itemId = event.target.parentElement.id; 
                    lists[listId-1].listContent.splice(itemId, 1); 
                    itemContainerEl.remove(); 
                }); 

                itemEl.textContent = inputEl.value; 
                itemContainerEl.append(itemEl, editIcon, delIcon);                
                itemListEl.appendChild(itemContainerEl); 

                lists[listId-1].listContent.push(inputEl.value); 

                inputEl.value=""; 
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

createBtnEl.addEventListener('click', todoApp.createList); 

listRenderEl.addEventListener('click', (event) => {
    listId = todoApp.displayList(event);  
}); 

addBtnEl.addEventListener("click", () => {
    todoApp.addItem(listId); 
}); 

itemListEl.addEventListener("click", todoApp.toggleItemStatus); 
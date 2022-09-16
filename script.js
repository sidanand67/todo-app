const inputEl = document.getElementById("user-input"); 
const addBtnEl = document.getElementById('add-btn'); 
const itemListEl = document.getElementById('item-list'); 


const todoApp = (
    function (){
        let items = []; 

        return {
            addItem(){
                let itemContainerEl = document.createElement("li");
                let itemEl = document.createElement('span');  
                let editIcon = document.createElement("i"); 
                let delIcon = document.createElement('i'); 

                itemEl.setAttribute('id', items.length.toString());  
                editIcon.classList.add('fa-solid', 'fa-pen'); 
                delIcon.classList.add("fa-solid", "fa-trash"); 
                
                items.push(inputEl.value); 

                editIcon.addEventListener("click", (event) => {
                    let itemContent = event.target.previousElementSibling;
                    inputEl.value = itemContent.textContent; 
                    items.splice(itemContent.id, 1); 
                    event.target.parentElement.remove();
                }); 

                delIcon.addEventListener("click", (event) => {
                    let itemId = event.target.parentElement.id; 
                    items.splice(itemId, 1); 
                    itemContainerEl.remove(); 
                }); 

                itemEl.textContent = inputEl.value; 
                itemContainerEl.append(itemEl, editIcon, delIcon);                
                itemListEl.appendChild(itemContainerEl); 

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


addBtnEl.addEventListener("click", todoApp.addItem); 
itemListEl.addEventListener("click", todoApp.toggleItemStatus); 
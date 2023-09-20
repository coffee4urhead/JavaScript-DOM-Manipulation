let myContentWrapper = document.querySelector('.container');
const myTaskContainer = document.querySelector('.task-container');
const myAddTaskButton = document.querySelector('#add-task-btn');
const myInputField = document.querySelector('#inp-type-txt');
const taskTxt = document.querySelector('.task-txt');
const myCheckbox = document.querySelector('#check-box-inp');
const deleteTaskBtn = document.querySelector('.del-task-btn');

myAddTaskButton.addEventListener('click', () => {
    
    if(taskTxt.innerText === myInputField.value) {
        alert("Cannot enter the same task again!");
        return;
    } 
    else {
        let txtValueOfInputField = myInputField.value;

        let newTaskDivContainer = document.createElement('div');
        newTaskDivContainer.classList.add('.task-container');
        
        let newTaskCheckbox = document.createElement('input');
        newTaskCheckbox.setAttribute('type', 'checkbox');
        newTaskCheckbox.setAttribute('id', 'check-box-inp');
        newTaskDivContainer.appendChild(newTaskCheckbox);

        let newTaskInfo = document.createElement('p');
        newTaskInfo.classList.add('.task-txt');
        newTaskInfo.innerText = txtValueOfInputField;
        newTaskDivContainer.appendChild(newTaskInfo);

        let deleteButtonForAddedTask = document.createElement('button');
        deleteButtonForAddedTask.classList.add('.del-task-btn');
        deleteButtonForAddedTask.innerText = 'Del';
        newTaskDivContainer.appendChild(deleteButtonForAddedTask);

        myContentWrapper.appendChild(newTaskDivContainer);
    }

});
    let clicksOnTheCheckbox = 0;
myCheckbox.addEventListener('click', () => {
    
    clicksOnTheCheckbox++;
    if(clicksOnTheCheckbox == 1){
        taskTxt.style.textDecoration = "line-through";
    }
    else {
        clicksOnTheCheckbox = 0;
        taskTxt.style.textDecoration = "none";
    }
});

deleteTaskBtn.addEventListener('click', () => {
    myContentWrapper.removeChild(myTaskContainer);
});

//It doesnt add elements based on their classes and ids provided

/*Possible Solutions:
    1-
*/
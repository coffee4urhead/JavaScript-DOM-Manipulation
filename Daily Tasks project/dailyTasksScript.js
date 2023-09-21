let myContentWrapper = document.querySelector('.container');

const myTaskContainer = document.querySelector('.task-container');
const getComputedStyles = getComputedStyle(myTaskContainer);
const marTopVal = getComputedStyles.getPropertyValue('--marTop');

const myAddTaskButton = document.querySelector('#add-task-btn');
const myInputField = document.querySelector('#inp-type-txt');
const taskTxt = document.querySelector('.task-txt');
const myCheckbox = document.querySelector('#check-box-inp');
const deleteTaskBtn = document.querySelector('.del-task-btn');

let marginTopHolder = 0;
let cssHeightVariable = 50;

myAddTaskButton.addEventListener('click', () => {
    
    marginTopHolder += 40;
    if(myInputField.value === "") {
        alert("Cannot enter a unspecified task to do!");
        return;
    }
    
    if(taskTxt.innerText === myInputField.value) {
        alert("Cannot enter the same task again!");
        return;
    } 

    else {
        let txtValueOfInputField = myInputField.value;
        
        let newTaskDivContainer = document.createElement('div');
        newTaskDivContainer.classList.add('task-container');
        newTaskDivContainer.style.setProperty('--marTop', marginTopHolder + "px");
        
        let newTaskCheckbox = document.createElement('input');
        newTaskCheckbox.setAttribute('type', 'checkbox');
        newTaskCheckbox.setAttribute('id', 'check-box-inp');
        newTaskDivContainer.appendChild(newTaskCheckbox);
        
        let newTaskInfo = document.createElement('p');
        newTaskInfo.classList.add('task-txt');
        newTaskCheckbox.addEventListener('click', () => {
            
            clicksOnTheCheckbox++;
            if(clicksOnTheCheckbox == 1){
                newTaskInfo.style.textDecoration = "line-through";
            }
            else {
                clicksOnTheCheckbox = 0;
                newTaskInfo.style.textDecoration = "none";
            }
        });
        newTaskInfo.innerText = txtValueOfInputField;
        newTaskDivContainer.appendChild(newTaskInfo);
        
        let deleteButtonForAddedTask = document.createElement('button');
        deleteButtonForAddedTask.classList.add('del-task-btn');
        deleteButtonForAddedTask.innerText = 'Del';
        deleteButtonForAddedTask.addEventListener('click', () => {
            myContentWrapper.removeChild(newTaskDivContainer);
        });
        newTaskDivContainer.appendChild(deleteButtonForAddedTask);
        
        myContentWrapper.appendChild(newTaskDivContainer);
        
        cssHeightVariable += 10;
        myContentWrapper.style.setProperty('height', cssHeightVariable + 'vh');
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
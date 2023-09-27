let myContentWrapper = document.querySelector('.container');

const myTaskContainer = document.querySelector('.task-container');
const getComputedStyles = getComputedStyle(myTaskContainer);
const marTopVal = getComputedStyles.getPropertyValue('--marTop');

const myAddTaskButton = document.querySelector('#add-task-btn');
const myInputField = document.querySelector('#inp-type-txt');
const taskTxt = document.getElementsByTagName('p');
const myCheckbox = document.getElementsByTagName('input')[1];
const deleteTaskBtn = document.getElementsByTagName('button')[1];

let marginTopHolder = 0;
let cssHeightVariable = 50;
let marginLeftHolder = 5;
myAddTaskButton.addEventListener('click', mainAppFunction());

function mainAppFunction() {
    myAddTaskButton.addEventListener('click', () => {

        marginTopHolder += 40;
        if (myInputField.value === "") {
            alert("Cannot enter a unspecified task to do!");
            return;
        }

        if (taskTxt.innerText === myInputField.value) {
            alert("Cannot enter the same task again!");
            return;
        }
        marginLeftHolder += 50;

        let txtValueOfInputField = myInputField.value;

        let newTaskListItem = document.createElement('li');
        newTaskListItem.style.setProperty('--marTop', marginTopHolder + "px");

        let newTaskCheckbox = document.createElement('input');
        newTaskCheckbox.setAttribute('type', 'checkbox');
        newTaskCheckbox.setAttribute('name', 'checkbox-inp-new');
        newTaskListItem.appendChild(newTaskCheckbox);

        let newTaskInfo = document.createElement('p');
        newTaskCheckbox.addEventListener('click', () => {

            clicksOnTheCheckbox++;
            if (clicksOnTheCheckbox == 1) {
                newTaskInfo.style.textDecoration = "line-through";
            }
            else {
                clicksOnTheCheckbox = 0;
                newTaskInfo.style.textDecoration = "none";
            }
        });
        newTaskInfo.innerText = txtValueOfInputField;
        newTaskListItem.appendChild(newTaskInfo);

        let myNewTaskImage = document.createElement('img');
        myNewTaskImage.classList.add('task-pic');
        myNewTaskImage.setAttribute('margin-left', marginLeftHolder + 'px');
        myNewTaskImage.setAttribute('alt', 'the task picture is here');
        myNewTaskImage.setAttribute('src', 'picturesFold/home.png');
        document.body.append(myNewTaskImage);

        let deleteButtonForAddedTask = document.createElement('button');
        deleteButtonForAddedTask.innerText = 'Delete task';

        deleteButtonForAddedTask.addEventListener('click', () => {
            myTaskContainer.removeChild(newTaskListItem);
            document.body.removeChild(myNewTaskImage);
            cssHeightVariable -= 10;
            myContentWrapper.style.setProperty('height', cssHeightVariable + 'vh');
            localStorage.removeItem('tasksElements');
        });
        newTaskListItem.appendChild(deleteButtonForAddedTask);

        myTaskContainer.appendChild(newTaskListItem);

        cssHeightVariable += 10;
        myContentWrapper.style.setProperty('height', cssHeightVariable + 'vh');
        myInputField.value = "";
        storeData();

    });
}

myCheckbox.addEventListener('click', addEventListenerToTheCheckbox());

let clicksOnTheCheckbox = 0;
function addEventListenerToTheCheckbox() {

    myCheckbox.addEventListener('click', () => {

        clicksOnTheCheckbox++;
        if (clicksOnTheCheckbox == 1) {
            taskTxt.style.textDecoration = "line-through";
        }
        else {
            clicksOnTheCheckbox = 0;
            taskTxt.style.textDecoration = "none";
        }
    });
}

deleteTaskBtn.addEventListener('click', deleteTaskFunc());

function deleteTaskFunc() {
    deleteTaskBtn.addEventListener('click', () => {
        myContentWrapper.removeChild(myTaskContainer);
    });
}

function storeData() {
    localStorage.setItem("tasksElements", myTaskContainer.innerHTML);
}

function readData() {
    myTaskContainer.innerHTML = localStorage.getItem("tasksElements");
}

readData();
/*
        ###Error and bug fixing probable issues:
        1.-- I should fix the behaviour of the loaded data when loading it, because the checkbox and delete button fuctions are not working properly on these loaded elements
 */
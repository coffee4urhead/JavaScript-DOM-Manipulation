const myTaskContainer = document.querySelector('.task-container');
const myAddTaskButton = document.querySelector('#add-task-btn');
const myInputField = document.querySelector('#inp-type-txt');
const taskTxt = document.querySelector('.task-txt');
const myCheckbox = document.querySelector('#check-box-inp');
const deleteTaskBtn = document.querySelector('.del-task-btn');

function displayPosition(position){
    console.log(position.coords.longitude);
    console.log(position.coords.latitude);
}

myAddTaskButton.addEventListener('click', () => {
    window.navigator.geolocation.watchPosition(displayPosition);
    let txtValueOfInputField = myInputField.value;
    taskTxt.innerText = txtValueOfInputField;
});

myCheckbox.addEventListener('click', () => {
    taskTxt.style.textDecoration = "line-through";
});
deleteTaskBtn.addEventListener('click', () => {
    let myContentWrapper = document.querySelector('.container');
    myContentWrapper.removeChild(myTaskContainer);
});
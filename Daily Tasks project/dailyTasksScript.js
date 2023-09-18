const myTaskContainer = document.querySelector('.task-container');
const myAddTaskButton = document.querySelector('#add-task-btn');

let myClicksOnTheAddButton = 0;
myAddTaskButton.addEventListener('click', () => {
    myTaskContainer.style.display = "none";
});
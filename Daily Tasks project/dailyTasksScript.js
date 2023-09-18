const myTaskContainer = document.querySelector('.task-container');
const myAddTaskButton = document.querySelector('#add-task-btn');

window.navigator.geolocation.watchPosition(displayPosition);

function displayPosition(position){
    console.log(position.coords.longitude);
    console.log(position.coords.latitude);
}
let myClicksOnTheAddButton = 0;
myAddTaskButton.addEventListener('click', () => {
    myTaskContainer.style.display = "none";
});
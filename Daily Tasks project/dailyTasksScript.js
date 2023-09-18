const myTaskContainer = document.querySelector('.task-container');
const myAddTaskButton = document.querySelector('#add-task-btn');

function displayPosition(position){
    console.log(position.coords.longitude);
    console.log(position.coords.latitude);
}
setInterval(window.navigator.geolocation.watchPosition(displayPosition), 120000);
let myClicksOnTheAddButton = 0;
myAddTaskButton.addEventListener('click', () => {
    myTaskContainer.style.display = "none";
});
const myCloseBtn = document.getElementById('btn-for-close');
const myOpenBtn = document.getElementById('open-btn');
const myParagraph = document.getElementById('demo');

myCloseBtn.addEventListener('click', () => {
    window.close();
});

myOpenBtn.addEventListener('click', () => {
    window.moveTo(0, 1);
})

function callTheTextFile() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(this.readyState === 1){
            console.log("Cennextion with server established");
        }
        if(this.readyState === 2){
            console.log("Actually receiving the http request");
        }
        if(this.readyState === 3){
            console.log("http request is processing in the time of call");
        }
        if(this.readyState === 4 && this.status === 200){
            myParagraph.innerText = this.responseText;
        }
    }

    xhr.open("GET", "someInfo.txt", true);
    xhr.send();
}
callTheTextFile();
let cards = document.querySelectorAll('.about');
let hiddenCards = document.querySelectorAll('.hidden-rotator');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('show-rotator');
        }
        else {
            entry.target.classList.remove('show-rotator');
        }
    })
})
hiddenCards.forEach(card => observer.observe(card))

// let hiddenCardsTwo = document.querySelectorAll('.hidden-translator');
// const observerTwo = new IntersectionObserver((entris) => {
//     entris.forEach(entr => {
//         if(entr.isIntersecting){
//             entr.target.classList.add('show-translator');
//         }
//         else {
//             entr.target.classList.remove('show-translator');
//         }
//     })
// })
// hiddenCardsTwo.forEach(card => observer.observe(card))

document.addEventListener('mousemove', function (e) {
    let xAxis = (window.innerWidth / 2 - e.pageX) / 50;
    let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    cards.forEach(card => {
        card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });
});
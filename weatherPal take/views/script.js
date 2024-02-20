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
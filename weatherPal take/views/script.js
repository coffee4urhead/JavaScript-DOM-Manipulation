let cards = document.querySelectorAll('.about');
let hiddenCards = document.querySelectorAll('.hidden-rotator');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
const inputNewsText = document.querySelector('#search-news-textField');
const submitTopicBtn = document.querySelector('#submit-topic-btn');

// returned info representation ================
let titlePara = document.querySelector('.title');
let descriptionPara = document.querySelector('.description');
// ================ ================ ================ ================

submitTopicBtn.addEventListener('click', function() {
    fetchNewsData(inputNewsText.value);
});

async function fetchNewsData(topic) {
    let fetchNewsData = await fetch(`/newsResp/${topic}`);
    const receivedData = await fetchNewsData.json();
    console.log(receivedData);
    
    let articlesArray = receivedData.articles;
    titlePara.textContent = articlesArray[articlesArray.length - 1].title
    descriptionPara.textContent = articlesArray[articlesArray.length - 1].description
}

function viewArticle() {
    window.location.href = "article.html";
}
// Adding the spinnig animation to the ul list 
const scrollers = document.querySelectorAll('.scroller');

if (prefersReducedMotion) {
  const settingsLink = document.createElement('a');
  settingsLink.textContent = "Go to Accessibility Settings";
  settingsLink.href = "https://scholar.harvard.edu/ccwilcox/blog/how-reduce-motion-various-operating-systems";

  const message = document.createElement('div');
  message.classList.add("message")
  message.textContent = "It seems like you prefer reduced motion. You can adjust this setting in your device's accessibility settings.";
  message.appendChild(settingsLink);

  const secondChild = document.body.children[0];
  document.body.insertBefore(message, secondChild.nextSibling);
  let rotators = document.querySelectorAll('.hidden-rotator');
  rotators.forEach(entry => {
    entry.classList.remove('hidden-rotator');
  })
} else {
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
    addAnimation();
}
function addAnimation () {
    scrollers.forEach(scroller => {
        scroller.setAttribute('data-animated', true);

        const innerScroller = document.querySelector('.scroller__inner');
        const scrollerContent = Array.from(innerScroller.children);

        scrollerContent.forEach(item => {

            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute("aria-hidden", true);
            innerScroller.appendChild(duplicatedItem);
        })
    })
}
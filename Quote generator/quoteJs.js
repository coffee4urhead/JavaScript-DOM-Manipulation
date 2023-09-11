const generateQuoteBtn = document.getElementById('gen-btn');
const quoteParagraph = document.getElementById('quote-txt');
const authorOfQuoteHtmlElement = document.getElementById('quote-author');

let myQuotesList = [
    {
        author: ' Mahatma Gandhi',
        quote: 'Learn as if you will live forever, live like you will die tomorrow.',
    },
    {
        author: 'Diane McLaren',
        quote: 'Nature has given us all the pieces required to achieve exceptional wellness and health, but has left it to us to put these pieces together.',
    },
    {
        author: 'Winston S. Churchill',
        quote: 'Success is not final; failure is not fatal: It is the courage to continue that counts.',
    },
    {
        author: 'Herman Melville',
        quote: 'It is better to fail in originality than to succeed in imitation.',
    },
    {
        author: 'Winston Churchill',
        quote: 'The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty.',
    },
    {
        author: 'Steve Jobs',
        quote: 'If you are working on something that you really care about, you don’t have to be pushed. The vision pulls you.',
    },
    {
        author: 'Theodore Roosevelt',
        quote: 'Keep your eyes on the stars, and your feet on the ground.',
    },
    {
        author: 'Michael Jordan',
        quote: 'Talent wins games, but teamwork and intelligence win championships.',
    },
    {
        author: 'Edmond Mbiaka',
        quote: 'One of the differences between some successful and unsuccessful people is that one group is full of doers, while the other is full of wishers.',
    },
    {
        author: 'Marcus Aurelius',
        quote: 'When you arise in the morning think of what a privilege it is to be alive, to think, to enjoy, to love…',
    },
    {
        author: 'Benjamin Franklin',
        quote: 'He that can have patience can have what he will.',
    },
    {
        author: 'Albert Einstein',
        quote: 'Life is like riding a bicycle. To keep your balance you must keep moving.',
    },
    {
        author: 'David Goggins',
        quote: 'The pain that you are willing to endure is measured by how bad you want it.',
    },
    {
        author: 'David Goggins',
        quote: 'I don’t stop when I’m tired. I stop when I’m done.',
    },
    {
        author: 'David Goggins',
        quote: 'It’s time to go to war with yourself.',
    }
]
function generateNewQuote(){
    let indexOfQuoteToBeGenerated = Number(Math.floor(Math.random() * myQuotesList.length));
    let author = myQuotesList[indexOfQuoteToBeGenerated].author;
    let quote = myQuotesList[indexOfQuoteToBeGenerated].quote;

    // Change the innerText of the HTML elements for each section
    quoteParagraph.innerText = quote;
    authorOfQuoteHtmlElement.innerText = author;
}
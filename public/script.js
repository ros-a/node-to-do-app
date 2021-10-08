document.querySelector('#add-film-plus-icon').addEventListener('click', () => {
    document.querySelector('form').style.visibility = 'visible'
    document.querySelector('#add-film-plus-icon').style.visibility = 'hidden'
})

window.addEventListener('load', (event) => {
    let numberOfQuotes = document.querySelectorAll('.quote').length
    getRandomQuote(numberOfQuotes)
})

document.querySelector('#submit').addEventListener('click', e => {
    e.preventDefault()
    let filmObject = {
        title: document.querySelector('#title').value,
        director: document.querySelector('#director').value,
        music: document.querySelector('#music').value,
        year: document.querySelector('#year').value,
        seen: document.querySelector('input[name="seen"]:checked').value === 'true' ? true : false,
        quote: document.querySelector('#quote').value
    }
    postFilm(filmObject)
})

document.querySelectorAll('.delete').forEach(deleteButton => {
    deleteButton.addEventListener('click', e => {
        let id = {
            id: e.target.dataset.id
        }
        deleteFilm(id)
    })
})

async function postFilm(filmObject) {
    fetch('/surrealist-cinema/add-film/', {
        method: 'POST',
        body: JSON.stringify(filmObject),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

async function deleteFilm(id) {
    fetch('/surrealist-cinema/delete-film/', {
        method: 'PUT',
        body: JSON.stringify(id),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

function getRandomQuote(numberOfQuotes) {
    let allQuotes = document.querySelectorAll('.quote')
    let randomNumber = Math.floor(Math.random() * numberOfQuotes)
    let quoteElem = allQuotes[randomNumber]
    let quoteTitle = quoteElem.dataset.title
    document.querySelector('#random-quote').innerHTML = quoteElem.innerHTML
    document.querySelector('#random-quote-title').innerHTML = quoteTitle

}


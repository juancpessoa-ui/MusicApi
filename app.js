'use strict'


// ELEMENTOS HTML

const cardsContainer = document.querySelector('.cards')

const inputBusca = document.querySelector('#inputBusca')

const btnBuscar = document.querySelector('#btnBuscar')

const nomeMusica = document.querySelector('#nomeMusica')

const nomeArtista = document.querySelector('#nomeArtista')

// PLAYER
const audio = new Audio()


// BUSCAR MUSICAS

async function buscarMusicas(nome) {

    const url = `https://corsproxy.io/?https://api.deezer.com/search?q=${nome}`

    const response = await fetch(url)

    const data = await response.json()

    return data.data
}



// CRIAR CARD
function criarCard(track) {

    const card = document.createElement('div')

    card.classList.add('card')

    card.innerHTML = `
    
        <img src="${track.album.cover_medium}">
    
        <h4>${track.title}</h4>
    
        <p>${track.artist.name}</p>
    
    `

    // CLICK
    card.addEventListener('click', () => {

        nomeMusica.textContent = track.title
        nomeArtista.textContent = track.artist.name
        audio.src = track.preview
        audio.play()
    })

    return card
}


// CARREGAR MUSICAS
async function carregarMusicas(busca = 'weeknd') {

    const tracks = await buscarMusicas(busca)

    cardsContainer.innerHTML = ''

    tracks.forEach(track => {

        const card = criarCard(track)

        cardsContainer.appendChild(card)

    })
}


// EVENTO BOTAO

btnBuscar.addEventListener('click', () => {

    carregarMusicas(inputBusca.value)
})

// ENTER
inputBusca.addEventListener('keypress', (event) => {

    if (event.key === 'Enter') {

        carregarMusicas(inputBusca.value)
    }
})


// INICIAR APP
carregarMusicas()
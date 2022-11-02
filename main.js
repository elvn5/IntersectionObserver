const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=10"
const $OBSERVER = document.querySelector('#observer')

let currentPage = null

function onIntersection(entries){
    if(entries[0].isIntersecting) {
        renderPokemon()
    }
}

function createObserver() {
    let observer;

    let options = {
        root: null,
        rootMargin: "0px",
        threshold: 1
    };

    observer = new IntersectionObserver(onIntersection, options);
    observer.observe($OBSERVER);
}



class PokemonCard {
    constructor(name, url) {
        this.pokemonName = name
        this.url = url
        this.card = document.createElement("div")
    }

    _initLayout() {
        this.card.classList.add("card")

        const $h1 = document.createElement("h1")
        $h1.classList.add("pokemon-title")
        $h1.textContent = this.pokemonName

        this.card.append($h1)
        document.querySelector(".container").appendChild(this.card)
    }



}

async function renderPokemon() {
    const response = await fetch(currentPage ?? BASE_URL)
    const data = await response.json()
    currentPage = data.next

    for (const value of data.results) {
        new PokemonCard(value.name, value.url)._initLayout()
    }

}


document.addEventListener("DOMContentLoaded", () => {
    renderPokemon()
    createObserver()
})




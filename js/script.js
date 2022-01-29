class Pokemon {
    constructor(name, url,) {
        this.name = name;
        this.url = url;          //https://pokeapi.co/api/v2/pokemon/1/
        this.id = this.url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '');
        this.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${this.id}.png`;
        this.price = Math.floor(Math.random() * 200);
    }
    html() {
        const pokediv = document.createElement('div');
        pokediv.className = 'product';
        pokediv.innerHTML = `  
            <a href="pokemon.html?id=${this.id}">
            <img class="card-img" src="${this.image}" alt='${this.name}'/></a>
            <h2 class="nome">${this.name}</h2>
            <p class="price-off"><s>R$ ${this.price}</s></p>
            <p class="price-on">R$ ${(this.price * 0.8).toFixed(2)}</p>
            <button class="btn btn-add-pokemon " data-id="${this.id}" >
                <img  src="image/pokebola.png" alt='pokebola'/> comprar
            </button>`;
        return pokediv;
    }
}

function render (pokemonsList){
    const listaPokemon = document.querySelector(".listaPokemon");
    listaPokemon.innerHTML = "";
    const pokemonsObjectList = pokemonsList.map((pokemon) => new Pokemon(pokemon.name,pokemon.url));

    pokemonsObjectList.forEach((pokemon)=>{
        const html = pokemon.html();
        listaPokemon.appendChild(html);
    });
    const btnAddPokemon = document.querySelectorAll(".btn-add-pokemon");
    btnAddPokemon.forEach((btn)=>{
        btn.addEventListener("click",(event)=>{
            const id = event.target.getAttribute("data-id");
            const pokemon = pokemonsObjectList.find((pokemonObject)=>pokemonObject.id == id);
            addPokemon(pokemon);
        });
    });
};

async function getPokemons(page = 0) {
    const listaPokemon = document.querySelector('.listaPokemon');
    listaPokemon.innerHTML ='<div class = "carregando">Carregando pokemons...</dic>';
    await fakePromise();
    const limit = 20;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset= ${limit * page}`);
    const json = await response.json();
    const pages = Math.ceil(json.count / limit);
    return {result: json.results,totalPage:pages};
}

const fakePromise = ()=>new Promise((resolve)=>setTimeout(resolve,2000));

function hiddenPrevious(page) {
    const btnAnt= document.querySelector('.btn-ant');
    btnAnt.style.visibility = page === 0 ? 'hidden': 'visible';
    return btnAnt;
}
//function para verificar se tem pag e fazer sumir o botao
function hiddenNext(page,totalPage) { 
    const btnProx = document.querySelector('.btn-prox');
    btnProx.style.visibility = page == totalPage ? 'hidden' :"visible ";
    return btnProx;
}


//function para voltar a pag
function previousPage(page) {
    const btnAnt = document.querySelector('.btn-ant');
    btnAnt.onclick = async () => {
        updateQueryParametes(page-1);
    };
};
//function para passar para a proxima pag
function nextPage(page) {
    const btnProx = document.querySelector('.btn-prox');
        btnProx.onclick = async () => {
            updateQueryParametes(page+1);
        };
}

function updatePageNumber(page){
    const pag = document.querySelector(".pag")
    pag.innerHTML = page != 0 ?`${page}`:"";
}
function getPageNumber(){
    const params = getQueryParamates();
    return parseInt(params.page || 0);
}
function getQueryParamates(page){
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    return params;
}
function updateQueryParametes(page){
    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.set("page",page);
    window.location.search = urlSearchParams.toString();
}


//executa com a pag termina de carregar
window.onload = async () => {
    const page = getPageNumber();

    updatePageNumber(page);

    const response = await getPokemons(page);
    render(response.result);
    
    hiddenPrevious(page);

    hiddenNext(page,response.totalPage);

    previousPage(page);

    nextPage(page);

}

class Pokemon {
    constructor(nome, url,) {
        this.nome = nome;
        this.url = url;          //https://pokeapi.co/api/v2/pokemon/1/
        this.id = this.url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '');
        this.imagem = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${this.id}.png`;
        this.preço = Math.floor(Math.random() * 200);
    }
    html() {
        const pokediv = document.createElement('div');
        pokediv.className = 'product';
        //
        pokediv.innerHTML = `  
            <img class="card-img" src="${this.imagem}" alt='${this.nome}'/>
            <h2 class="nome">${this.nome}</h2>
            <p class="price-off"><s>R$ ${this.preço}</s></p>
            <p class="price-on">R$ ${(this.preço * 0.8).toFixed(2)}</p>
            <button class="btn" onclick="addPokemon()" >
                <img  src="image/pokebola.png" alt='pokebola'/> comprar
            </button>`;

           
        
        return pokediv;
    }

}
function addPokemon(){

    let name =document.querySelector(".nome").value;
    localStorage.nome =name;
    
    
    //let a = localStorage.setItem(imagem=`${this.imagen}`,nome=`${this.nome}`)

}
 //localStorage.setItem();
 //localStorage.removeItem("p")


/*async function getPokemons() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon');

    const json = await response.json();

    return json;
}*/


let page = 0
const pag = document.querySelector('.pag');
paginas = page +1;
pag.innerHTML = `${paginas}`

async function getPokemons(page = 0) {
    const listaPokemon = document.querySelector('.listaPokemon');
    listaPokemon.innerHTML ='<div class = "carregando">carregando pokemons...</dic>'
    const limit = 20;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset= ${limit * page}`);
    const json = await response.json();
    const pages = Math.ceil(json.count / limit);
    
  
    return json;
}
const fakePromise = ()=>new Promise((resolve)=>setTimeout(resolve,3000));




function temAnterior(page) {
    const btnAnt= document.querySelector('.btn-ant');
    btnAnt.style.visibility = page === 0 ? 'hidden': 'visible';
}
//function para verificar se tem pag e fazer sumir o botao
function temProxima(page) { 
    const btnProx = document.querySelector('.btn-prox');
    btnProx.style.visibility = page === 55 ? 'hidden' :"visible ";

}

//function para voltar a pag
function btnAnt() {
    const btnAnt = document.querySelector('.btn-ant');
    const pag = document.querySelector('.pag')
   
    btnAnt.onclick = async () => {
        const response = await getPokemons(page -= 1);
        const listaPokemon = document.querySelector('.listaPokemon');
        pag.innerHTML = `${paginas-=1}`
        listaPokemons(response.results);
    }
}
//function para passar para a proxima pag
function btnProx() {
    const btnProx = document.querySelector('.btn-prox');
    const pag = document.querySelector('.pag')
    btnProx.onclick = async () => {
        const response = await getPokemons(page += 1);
        const listaPokemon = document.querySelector('.listaPokemon');
        pag.innerHTML = `${paginas+=1}`
       
        
        listaPokemons(response.results);
    }
}



function listaPokemons(pokemonsApi) {
    const listaPokemon = document.querySelector('.listaPokemon');
    listaPokemon.innerHTML = ''
    const pokemons = pokemonsApi.map((pokemon) => new Pokemon(pokemon.name, pokemon.url));

    pokemons.forEach((pokemon) => {
        const html = pokemon.html();
        listaPokemon.appendChild(html)
    });
    console.log()
    temAnterior(page);
    temProxima(page);
}

   

//executa com a pag termina de carregar
window.onload = async () => {
    const listaPokemon = document.querySelector('.listaPokemon');

    const response = await getPokemons();

    const pokemons = response.results.map((pokemon) => new Pokemon(pokemon.name, pokemon.url));

    pokemons.forEach((pokemon) => {
        const html = pokemon.html();
        listaPokemon.appendChild(html);
    });
    const resposta = await getPokemons(page);
    await fakePromise();

    listaPokemons(response.results);
     
    btnAnt();

    btnProx();

    temAnterior(page);

    temProxima(page);

    CarregarCarrinho();

    
    
   
}

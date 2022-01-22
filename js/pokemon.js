

class poke {
    constructor(options) {
        this.name = options.name;
        this.url = options.url;
        this.types = options.types.map(typeItem => typeItem.type.name);
        this.abilities = options.abilities.map(abilityType => abilityType.ability.name);
        this.id = options.id;
        this.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.id}.png`;


    }

    html() {
        const pokemon = document.querySelector('.pokemon')
        //pokemon.innerHTML = `<div class = "carregando">carregando pokemons...</div>`;
        pokemon.innerHTML = `

        <div class = "info">
        <div class = 'imagemPokemon'>
            <img src = "${this.image}" alt = "${this.name}"/>
        </div>
       
        <h1>${this.name}</h1>
        <hr>
        <h2>Tipo</h2>
        
            <p>${this.types}<p>
        
        <hr>
        <h2>Habilidades</h2>
       
            <p>${this.abilities}</p>  
            </div>`

        return pokemon;
    }
  

}





function getQueryparametes() {


    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    return params;

}
async function getPokemonData(id) {
    


    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    const response = await fetch(url);
    const data = await response.json();

    return data;
}
const fakePromise = () => new Promise((resolve) => setTimeout(resolve, 3000));

window.onload = async function () {
    
    const pokemon = document.querySelector('.pokemon');
    pokemon.innerHTML = `<div class = "carregando">carregando pokemons...</div>`

    await fakePromise();

    const { id } = getQueryparametes();
    const data = await getPokemonData(id);


    const Poke = new poke(data);
   
    
    try{
       

        Poke.html();


     }catch(error){

    pokemon.innerHTML =`<div class = "erro"> Pokemon não encontrado</div> `
    }
    CarregarCarrinho();
}















    /*const pokemonDiv = document.querySelector('.name');
    const pokeimg = document.querySelector('.imagemPokemon')
    const atributo = document.querySelectorAll('.atributo')

      const  abilit= data.abilities//[0].ability.name
       console.log(abilit)
       const pokemonName = data.name
        console.log(pokemonName)
        const imagemPokemon = data.sprites.front_default
        console.log(imagemPokemon)
  
      pokemonDiv.innerHTML = pokemonName

       pokeimg.src = imagemPokemon
  
       atributo.innerHTML = abilit*/

   




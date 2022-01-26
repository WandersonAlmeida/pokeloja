
function openCart() {
    const btncar = document.querySelector('#car');
    btncar.addEventListener('click', function (event) {
        event.preventDefault();
        document.body.className = document.body.className === ''? "carrinho-aberto" : "";
        renderCart();
    });
}



function closeCart() {
    const fecharCar = document.querySelector('#fecharCar')
    const btnfecharCarrinho = document.querySelector('#fecharCarrinho');

    fecharCar.addEventListener('click', function (event) {
        event.preventDefault();
        document.body.className = '';
    })

    document.addEventListener('keyup', (event) => {
        const keyName = event.key;
        if (keyName === 'Escape') {
            document.body.className = "";
        }
    });

    btnfecharCarrinho.addEventListener('click', function (event) {
        event.preventDefault();
        if (document.body.className === "carrinho-aberto") {
            document.body.className = "";
        }
        
    });
}

function renderCart(){

    const pokemonCartList = document.querySelector("#pokemonsAdded");
    let html ="<ul>"; 
    const pokemonsAdded = getLocalStorage()
    pokemonsAdded.forEach((pokemon)=>{
        html+=`<li>${pokemon.id}- ${pokemon.name}- ${pokemon.price}</li>`;
    });

    html+=`</ul>`;
    pokemonCartList.innerHTML = html; 
}
function getLocalStorage(){
    return JSON.parse(localStorage.getItem("pokemonscart")) || [];
}
function addPokemon(pokemon){
    const pokemonsAdded = getLocalStorage();
    pokemonsAdded.push(pokemon);
    localStorage.setItem("pokemonCart",JSON.stringify(pokemonsAdded));
}
window.addEventListener("load",async()=>{
    console.log("load carrinho.js");  
    openCart();
    closeCart();
});

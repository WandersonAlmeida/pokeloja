
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
    const pokemonCartList = getLocalStorage();
    let html ="<ul>"; 
    pokemonAdded.forEach((pokemon)=>{
        html+=`<li>${pokemon.id}- ${pokemon.name}- ${pokemon.price}</li>`;
    });

    html+="</ul>";
    pokemonCartList.innerHTML = html; 
}
function getLocalStorage(){
    return JSON.parse(localStorage.getItem("pokemonscart")) || [];
}
function addPokemon(pokemon){
    const pokemonAdded = getLocalStorage();
    pokemonAdded.push(pokemon);
    localStorage.setItem("pokemonCart",JSON.stringify(pokemonAdded));
}
window.addEventListener("load",async()=>{
    openCart();
    closeCart();
});

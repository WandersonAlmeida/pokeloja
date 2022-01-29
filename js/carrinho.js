
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
        html+=`<li><img class = "imageCar" src= "${pokemon?.image}"alt= "${pokemon?.name}"/></li>
        <li class = "nameCar"> ${pokemon?.name}</li>
        <li class = "priceCar">R$ ${(pokemon?.price * 0.8).toFixed(2)}</li>
        <div class ="quantidade"> <button class="removeItem" onclick="remove('${pokemon.id}')" >
            Excluir
        </button>
        </div>
        `;
        
    });

    html+=`</ul>`;
    pokemonCartList.innerHTML = html; 
}
function remove(pokemonid){
    const removeItem = document.querySelector(".removeItem");
    const pokemonsAdded = getLocalStorage();
    const local = pokemonsAdded.filter(pokemon=>pokemon.id!== pokemonid)
        
      
    
    localStorage.setItem("pokemonsCart",JSON.stringify(local));
} 
    
function getLocalStorage(){
    return JSON.parse(localStorage.getItem("pokemonsCart")) || [];
}
function addPokemon(pokemon){
    const pokemonsAdded = getLocalStorage();
    pokemonsAdded.push(pokemon)
    
    

    
    localStorage.setItem("pokemonsCart",JSON.stringify(pokemonsAdded));
}


window.addEventListener("load",async()=>{
    console.log("load carrinho.js");  
    openCart();
    closeCart();
});
//const local = pokemonsAdded.filter(pokemon=>pokemon.id!== pokemonid)
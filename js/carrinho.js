function openCart() {
  const btncar = document.querySelector("#car");
  btncar.addEventListener("click", function (event) {
    event.preventDefault();
    document.body.className =
      document.body.className === "" ? "carrinho-aberto" : "";
    renderCart();
  });
}

function closeCart() {
  const fecharCar = document.querySelector("#fecharCar");
  const btnfecharCarrinho = document.querySelector("#fecharCarrinho");

  fecharCar.addEventListener("click", function (event) {
    event.preventDefault();
    document.body.className = "";
  });

  document.addEventListener("keyup", (event) => {
    const keyName = event.key;
    if (keyName === "Escape") {
      document.body.className = "";
    }
  });

  btnfecharCarrinho.addEventListener("click", function (event) {
    event.preventDefault();
    if (document.body.className === "carrinho-aberto") {
      document.body.className = "";
    }
  });
}

function renderCart() {
  const pokemonCartList = document.querySelector("#pokemonsAdded");
  let html = "<ul>";
  const pokemonsAdded = getLocalStorage();
  pokemonsAdded.forEach((pokemonObj) => {
    html += `<li><img class = "imageCar" src= "${
      pokemonObj.pokemon.image
    }"alt= "${pokemonObj.pokemon.name}"/></li>
        <li class = "nameCar"> ${pokemonObj.pokemon.name}</li>
        <li class = "priceCar">R$ ${(
          pokemonObj.pokemon.price * pokemonObj.quantity
        ).toFixed(2)}</li>
        <li class = "quantity"> Quantidade = ${pokemonObj.quantity}</li>
        <div class ="quantidade"> <button class="removeItem" onclick="remove('${
          pokemonObj.pokemon.id
        }')" >
            Excluir
        </button>
        </div>
        `;
  });

  html += `</ul>`;
  pokemonCartList.innerHTML = html;
}

function remove(pokemonid) {
  //const removeItem = document.querySelector(".removeItem");
  const pokemonsAdded = getLocalStorage();
  const local = pokemonsAdded.filter((pokemonObj) => {
    if (pokemonObj.pokemon.id !== pokemonid) {
      return true;
    }
    pokemonObj.quantity = pokemonObj.quantity - 1;
    if (pokemonObj.quantity == 0) {
      return false;
    }
    return true;
  });

  localStorage.setItem("pokemonsCart", JSON.stringify(local));
  renderCart();
}

function getLocalStorage() {
  return JSON.parse(localStorage.getItem("pokemonsCart")) || [];
}

function addPokemon(pokemon) {
  const pokemonsAdded = getLocalStorage();
  let quantity = 0;
  const newPokemonsAdded = pokemonsAdded.filter((pokemonObj) => {
    if (pokemonObj.pokemon.id === pokemon.id) {
      quantity = pokemonObj.quantity;
      return false;
    }
    return true;
  });

  newPokemonsAdded.push({ pokemon, quantity: quantity + 1 });

  localStorage.setItem("pokemonsCart", JSON.stringify(newPokemonsAdded));
}

window.addEventListener("load", async () => {
  console.log("load carrinho.js");
  openCart();
  closeCart();
});
//const local = pokemonsAdded.filter(pokemon=>pokemon.id!== pokemonid)

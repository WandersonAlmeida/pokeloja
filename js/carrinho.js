function CarregarCarrinho() {
    abrirCarrinho();
    fecharCarrinho();
}



function abrirCarrinho() {
    const btncar = document.querySelector('#car');
    btncar.addEventListener('click', function (event) {
        console.log(btncar)
        event.preventDefault();
        if (document.body.className === '') {
            document.body.className = "carrinho-aberto"
        } else{
            document.body.className = '';
        }
        
    });
}



function fecharCarrinho() {
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
    }, false);

    btnfecharCarrinho.addEventListener('click', function (event) {
        event.preventDefault();
        if (document.body.className === "carrinho-aberto") {
            document.body.className = "";
        }
        
    })
}

/*function addPokemon(pokemon) {
    console.log({ pokemon })
}*/




/*function abrir(bb){
    const btncar = document.querySelector('#car');
const aberto = document.body.className === "carrinho-aberto"
const fechado = document.body.className = "";
const abrir = bb = fechado?aberto:fechado

}*/
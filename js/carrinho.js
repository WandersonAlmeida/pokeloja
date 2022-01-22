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
        } else {
            document.body.className = '';
        }
    });
}



function fecharCarrinho() {
    const fecharCar = document.querySelector('#fecharCar')
    fecharCar.addEventListener('click', function (event) {
        event.preventDefault();
        document.body.className = '';
    })

    document.addEventListener('keyup', (event) => {
        const keyName = event.key;
        if (keyName === 'control') {
            document.body.className = "";
        }
    }, false);


    const btnfecharCarrinho = document.querySelector('#fecharCarrinho');
    btnfecharCarrinho.addEventListener('click', function (event) {
        console.log(btnfecharCarrinho)
        event.preventDefault();
        if (document.body.className === "carrinho-aberto") {
            document.body.className = "";
        }

    })
}

function addPokemon(pokemon) {
    console.log({ pokemon })
}
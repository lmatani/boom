const userInput = document.getElementById('userInput');
const result = document.getElementById('result');
const restart = document.getElementById('restart');
const countdown = document.getElementById('countdown');
const body = document.querySelector('body');
let promesaCuentaAtras;
let promesaRandom;

function cuentaAtras() {
    promesaCuentaAtras = new Promise((resolve) => {
        let contadorAtras = 5;
        let idInterval = setInterval(() => {
            countdown.innerHTML = `Cuenta atrás: ${contadorAtras} segundos`;
            if (--contadorAtras < 0) {
                clearInterval(idInterval);
                resolve(true);
            }
        }, 1000);
    });
    return promesaCuentaAtras;
}

function numeroRandom() {
    promesaRandom = new Promise((resolve) => {
        setTimeout(() => {
            console.log('promesaRandom ');
            numAleatorio =  Math.floor(Math.random() * 3) + 1;
            resolve(numAleatorio);
        }, 5000);
    });
    return promesaRandom;
}


restart.addEventListener('click', () => {
    countdown.innerHTML = '';
    result.innerHTML = '';
    userInput.readOnly = false;
    userInput.value = 0;
    
});


body.addEventListener('click', (event) => {
    const elemento = event.target;
    if (elemento !== null && elemento.id !== 'userInput' && elemento.id !== 'restart'){
        jugarPartida();
    }
   
});

document.addEventListener('keypress', () => {
     jugarPartida();
});


function jugarPartida(){
    let numUsuario = parseFloat(userInput.value);
    userInput.readOnly = true;
    if (numUsuario >= 1 && numUsuario <= 3) {
        promesaCuentaAtras = cuentaAtras();
        promesaRandom = numeroRandom();
        promesaCuentaAtras.then((fin) => {
            return promesaRandom;
        })
        .then((numAleatorio) =>  {
            if (numUsuario === numAleatorio)
            {
                result.innerHTML = `<p class="green">Enhorabuena, has salvado el mundo <i class="fa-solid fa-star"></i></p>
                        <p>Tu número ${numUsuario} es el mismo que el número ${numAleatorio}</p>`;
            }
            else
            {
                result.innerHTML = `<p class="red">Nooooooo, la bomba ha estallado <i class="fa-solid fa-bomb"></i></p>
                <p>Tu número ${numUsuario}  no coincide con el número ${numAleatorio}</p>`;

            }
        });
    }   
    else {
        result.innerHTML = 'Para iniciar el juego introduce un número entre 1 y 3!';
    }

}






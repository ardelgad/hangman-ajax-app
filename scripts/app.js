// Código principal de la aplicación

// Obtener las películas de
// https://raw.githubusercontent.com/hjorturlarsen/IMDB-top-100/master/data/movies.json

let movie = "the shining";
let keyPressed = "";
// Cambiar cualquier carácter por un *
let movieGuess = movie.replaceAll(/[a-zA-z]/g, "*");

// Alternativa: encuentrame todo lo que NO sea un espacio en blanco, y cámbialo por un *
//let movieGuess = movie.replaceAll(/[^\s]/g, "*");

// Recorremos el string. nextLetter vale a cada iteración una letra del string
updateDOM();
/* //El FOR anterior es equivalente a:
for (let i = 0; i < movieGuess.length; i++) {
    console.log(movieGuess[index]);
} */

/*
 * 1. Capturar el evento keyup
 * 2. Ver si la tecla capturada está en la palabra a adivinar (movie). event.key -> nos dice la tecla que ha pulsado el usuario
 * 3. Si está-->
 *    3.1 Recorrer el string original con movie.forEach((nextLetter, index) => {})
 *    3.2. Cada vez que encuentro una posición del string que es igual a la letra adivinada, habría algo así como...
 *    movie = movie.slice(0, index) + nextLetter + movie.slice(index+1);
 */

//1. Capturar el evento keyup
document.body.addEventListener("keyup",handleKeyboard)

function handleKeyboard(e) {
    keyPressed = e.key.toLowerCase();

   if (!/^[a-z]$/i.test(keyPressed)) {
        // esto no es una letra de la a la z
        return;
    }
    //console.log(keyPressed)

    checkLetter();
    updateDOM();
}

//2. Ver si la tecla capturada está en la palabra a adivinar (movie).
function checkLetter(params) {
        // si la tecla pulsada está en la palabra a adivinar...
        for (let i = 0; i < movie.length; i++) {

            if (movie[i] == keyPressed) {
                movieGuess = movieGuess.slice(0, i) + keyPressed + movieGuess.slice(i+1);
            }

        }
        console.log(movieGuess);
}

function updateDOM() {
    document.querySelector("#puzzle").innerHTML = "";
    for (nextLetter of movieGuess) {
        // tenemos que crear tantos <span>*</span> como letras hay en el string movieGuess
        // Cuando encontramos un espacio en realidad hay que crear un <span></span>
        // Para todos los span hay que hacer un appendChild en id="puzzle".
        const span = document.createElement("span");
        span.textContent = nextLetter;
        document.querySelector("#puzzle").appendChild(span);
    }
}


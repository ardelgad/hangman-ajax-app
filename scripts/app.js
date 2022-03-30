// Código principal de la aplicación

// Obtener las películas de
// https://raw.githubusercontent.com/hjorturlarsen/IMDB-top-100/master/data/movies.json
// Juan Pablo: OJO Cuidao, hay películas con ":", "accentos", números

reset();

// El FOR anterior es equivalente a:
// for (let i = 0; i < movieGuess.length; i++) {
//     console.log(movieGuess[index]);
// }

/**
 * 1. Capturar el evento keyup
 * 2. Ver si la tecla capturada está en la palabra a adivinar (movie). event.key -> nos dice la tecla que ha pulsado el usuario
 * 3. Si está-->
 *    3.1 Recorrer el string original con for
 *    3.2. Cada vez que encuentro una posición del string que es igual a la letra adivinada, habría algo así como...
 *    movieGuess = movieGuess.slice(0, index) + nextLetter + movie.movieGuess(index+1);
 *   3.2 Actualizar el DOM con movieGuess. Lo más sencillo es 'limpiar' todo el HTML de id="puzzle"; y volver a generar todos los <span>. Alternativamente, podríamos actualizar el <span> que coincida con la posición del string donde iría la letra acertada.
 * 
 * Corregir: 13.10
 * 
 */

document.addEventListener("keyup", async function (e) {

    // si has perdido O has ganado...no gestiones el evento
    if (STATE.attempts == 0 || STATE.movieGuess == STATE.movie) {
        return;
    }

    // Escribir de la a a la z
    let keyPressed = e.key.toLowerCase();
    if (!/^[a-z]$/i.test(keyPressed)) {
        // esto no es una letra de la a la z

        return;
    }


    // Te devuelve un true si la letra forma parte del string de la pelícila
    let isCorrect = STATE.movie.includes(keyPressed);

    // Si ya has pulsado la tecla devuelve true
    let hasAlreadyBeenPressed = STATE.checkedLetters.includes(keyPressed);

    // Si te has equivocado de letra o ya la habías pulsado, 
    if (!isCorrect || hasAlreadyBeenPressed) {

        // decrementar el número de intentos
        STATE.attempts--;
        DOM.updateAttempts(STATE.attempts);

        // Gestionamos la derrota
        if (STATE.attempts == 0) {
            // hemos perdido
            DOM.showLooserMessage();
            const audio = new Audio('../sounds/lost.wav');
            audio.play();
            return;
        }
    }

    // Si no habías pulsado la tecla anteriormente, incluirla en la lista de teclas pulsadas 
    if (!hasAlreadyBeenPressed) {


        STATE.checkedLetters.push(keyPressed);
        DOM.addGuessedLetter(keyPressed, isCorrect);


    }

    // Actualizamos la variable de estado de película adivinada substituyendo los '*' por la letra que hemos pulsado
    for (let i = 0; i < STATE.movie.length; i++) {

        if (STATE.movie[i] == keyPressed) {
            STATE.movieGuess = STATE.movieGuess.slice(0, i) + keyPressed + STATE.movieGuess.slice(i + 1);
        }

    }

    // Hemos ganado?
    console.log(STATE.movie, STATE.movieGuess);

    if (STATE.movie == STATE.movieGuess) {
        const audio = new Audio('../sounds/win.wav');
        audio.play();
        DOM.showWinnerMessage();
        const imageMovie = await REQUEST.getImageFromMovie(STATE.movie);
        DOM.displayMovieImage(imageMovie);

    }

    // Encarga de actualizar la interfaz de la palabra adivinada hasta el momento m*trix rel*aded
    DOM.updateGuessedWord(STATE.movieGuess);
})

document.querySelector("#reset").addEventListener("click", reset);

function reset() {
    // Invocamos la función getMovieFromJson
    REQUEST.getMovieFromJson((movie) => {
        STATE.reset(movie);
        console.log(movie);
        DOM.updateGuessedWord(STATE.movieGuess);
        DOM.resetUX();
    });
}
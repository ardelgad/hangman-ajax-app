let STATE = {
    movie: undefined,
    movieGuess: undefined,
    checkedLetters: [],
    attempts: 5,

    reset(movie) {
        this.movie = movie;
        this.movieGuess = movie.replaceAll(/[a-zA-z]/g, "*");
        this.checkedLetters = [];
        this.attempts = 5;
    }
};
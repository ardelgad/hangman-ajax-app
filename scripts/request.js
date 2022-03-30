let REQUEST = {

    async getMovieFromJson(cb) {

        let response = await fetch("https://raw.githubusercontent.com/hjorturlarsen/IMDB-top-100/master/data/movies.json");

        let movies = await response.json();

        // usar filter para limpiar las películas que contienen un número
        movies = movies.filter(movie => !/\d/.test(movie.title));

        // toma una posición del array al azar
        let movie = movies[Math.floor(Math.random() * movies.length)];

        cb(movie.title);
    },

    async getImageFromMovie(title) {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=f67a8ad780c75b59b2e185315b4e7818&language=en-US&page=1&include_adult=false&query=${title}`;

        const path_to_images = 'https://image.tmdb.org/t/p/original'

        const response = await fetch(url);

        const movies = await response.json();

        const movieImage = path_to_images + movies.results[0].poster_path;

        return movieImage;
    }
}

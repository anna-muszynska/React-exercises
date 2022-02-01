import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
    const [movies, setMovies] = useState([]);

    async function moviesHandler() {
        const response = await fetch("https://swapi.dev/api/films/");
        const data = await response.json();

        const transformedMovies = data.results.map(movie => {
            return {
                id: movie.episode_id,
                title: movie.title,
                openingText: movie.opening_crawl,
                releaseDate: movie.releseDate,
            };
        });
        setMovies(transformedMovies);
    }

    return (
        <React.Fragment>
            <section>
                <button onClick={moviesHandler}>Fetch Movies</button>
            </section>
            <section>
                <MoviesList movies={movies}/>
            </section>
        </React.Fragment>
    );
}

export default App;

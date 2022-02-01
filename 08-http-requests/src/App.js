import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    async function moviesHandler() {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("https://swapi.dev/api/films/");

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

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
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    }

    let content = <p>Found no movies.</p>

    if (isLoading) {
        content = <p>Loading...</p>
    }

    if (movies.length > 0) {
        content = <MoviesList movies={movies}/>
    }

    if (error) {
        content = <p>{error}</p>
    }

    return (
        <React.Fragment>
            <section>
                <button onClick={moviesHandler}>Fetch Movies</button>
            </section>
            <section>
                {content}
            </section>
        </React.Fragment>
    );
}

export default App;

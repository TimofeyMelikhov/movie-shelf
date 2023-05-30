import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './hooks/redux';
import { fetchMovies } from './redux/ActionCreators'
import { MoviesCard } from './components/MoviesCard'

const App: React.FC = () => {

  const dispatch = useAppDispatch()
  const { movies, isLoading, isError } = useAppSelector(state => state.moviesReducer)

  useEffect(() => {
    dispatch(fetchMovies())
  }, [dispatch])

  console.log(movies)

  return (
    <div>

      { isLoading && <p>Loading...</p> }
      { isError && <p>{isError}</p> }

      { movies.map(movie => <MoviesCard key={movie.kinopoiskId} movie={movie} />) }

      <p>{JSON.stringify(movies)}</p>

    </div>
  );
}

export default App;

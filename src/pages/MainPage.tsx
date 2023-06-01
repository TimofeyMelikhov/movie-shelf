import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { fetchMovies } from '../redux/ActionCreators'
import { Movies } from '../components/Movies'

export const MainPage: React.FC = () => {
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

      { movies.map(movie => <Movies key={movie.kinopoiskId} movie={movie} />) }

    </div>
  );
}
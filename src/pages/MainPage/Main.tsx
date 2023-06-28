import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchMovies } from '../../redux/actions/MoviesAction'
import { Movies } from '../../components/movie/Movies'
import { MovieSearch } from '../../components/movieSearch/MovieSearch'
import classes from './main.module.css'

export const MainPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { movies, isLoading, isError } = useAppSelector(state => state.moviesReducer)

  useEffect(() => {
    dispatch(fetchMovies())
  }, [dispatch])

  return (
    <div className={classes.main_container}>
      <MovieSearch />
      <div className={classes.movie_container}>
        { isLoading && <p>Loading...</p> }
        { isError && <p>{isError}</p> }
        { movies.map(movie => <Movies key={movie.kinopoiskId} movie={movie} />) }
      </div>
    </div>
  );
}
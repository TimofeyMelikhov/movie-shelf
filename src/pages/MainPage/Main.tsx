import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchMovies } from '../../redux/actions/MoviesAction'
import { Movies } from '../../components/movie/Movies'
import classes from './main.module.css'
import { Menu } from '../../components/menu/Menu'
import { Preloader } from '../../components/preloader/Preloader'

export const MainPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { movies, isLoading, isError } = useAppSelector(state => state.moviesReducer)


  useEffect(() => {
    dispatch(fetchMovies())
  }, [dispatch])

  return (
    <div className={classes.main_container}>
      <Menu />
      <div className={classes.movie_container}>
        { isLoading ? 
            <Preloader/> 
          : 
            movies.map(movie => <Movies key={movie.kinopoiskId} movie={movie} />) 
        }
        { isError && <img src="https://http.cat/402" className='w-[550px]' alt="" /> }
      </div>
    </div>
  );
}
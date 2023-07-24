import React from 'react'
import { Movies } from '../../components/movie/Movies'
import classes from './main.module.css'
import { Menu } from '../../components/menu/Menu'
import { Preloader } from '../../components/preloader/Preloader'
import { useMainMoviesQuery } from '../../redux/movies.api'

export const MainPage: React.FC = () => {

  const { data: movies, isLoading, isError } = useMainMoviesQuery('')

  return (
    <div className={classes.main_container}>
      <Menu />
      <div className={classes.movie_container}>
        { isLoading ? 
            <Preloader/> 
          : 
            movies?.items?.map(movie => <Movies key={movie.kinopoiskId} movie={movie} />) 
        }
        { isError && <img src="https://http.cat/402" className='w-[550px]' alt="" /> }
      </div>
    </div>
  );
}
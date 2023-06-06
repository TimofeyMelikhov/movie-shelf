import React from 'react'
import { IMovie } from '../../models/IMovieModels'
import { useNavigate } from 'react-router-dom'
import classes from './movies.module.css'

interface moviesProps {
  movie: IMovie
}

export const Movies = ({movie}: moviesProps) => {

  const navigate = useNavigate()

  const clickHandler = () => {
    navigate(`/film/${movie.kinopoiskId}`)
  }

  const countries = movie.countries.map(c => c.country).join(', ')
  const genres = movie.genres.map(c => c.genre).join(', ')

  return (
    <div className={classes.wrapper} onClick={clickHandler}>
      <p style={{fontSize: '28px', fontWeight: '700', cursor: 'pointer'}}>{movie.nameRu}</p>
      <img src={movie.posterUrlPreview} alt="poster" />
      <p style={{fontSize: '32px'}}>О фильме</p>
      <p>Год производства: {movie.year} </p>
      <p>Страна: {countries} </p>
      <p>Жанр: {genres} </p>
    </div>
  )
}

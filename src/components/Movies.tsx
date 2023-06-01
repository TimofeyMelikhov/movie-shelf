import React from 'react'
import { IMovie } from '../models/IMovieModels'
import classes from './navigation.module.css'

interface moviesProps {
  movie: IMovie
}

export const Movies = ({movie}: moviesProps) => {

  const countries = movie.countries.map(c => c.country).join(', ')
  const genres = movie.genres.map(c => c.genre).join(', ')

  return (
    <div className={classes.container}>
      <p style={{fontSize: '32px', fontWeight: '700'}}>{movie.nameRu}</p>
      <img src={movie.posterUrlPreview} alt="poster" />
      <p style={{fontSize: '32px'}}>О фильме</p>
      <p>Год производства: {movie.year} </p>
      <p>Страна: {countries} </p>
      <p>Жанр: {genres} </p>
    </div>
  )
}

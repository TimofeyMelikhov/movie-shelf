import React from 'react'
import { IMovie } from '../models/IMovieModels'

interface movieCardProps {
  movie: IMovie
}

export function MoviesCard({movie}: movieCardProps) {

  const countries = movie.countries.map(c => c.country).join(', ')
  const genres = movie.genres.map(c => c.genre).join(', ')

  return (
    <div>
      <p style={{fontSize: '32px', fontWeight: '700'}}>{movie.nameRu}</p>
      <img src={movie.posterUrlPreview} alt="poster" />
      <p style={{fontSize: '32px'}}>О фильме</p>
      <p>Год производства: {movie.year} </p>
      <p>Страна: {countries} </p>
      <p>Жанр: {genres} </p>
      <p>Слоган: {movie.slogan} </p>
      <p>Описание: {movie.description} </p>
    </div>
  )
}

import React from 'react'
import { IMovie } from '../models/IMovie'

interface movieCardProps {
  movie: IMovie
}

export function MoviesCard({movie}: movieCardProps) {
  return (
    <div>
      <p> {movie.description} </p>
    </div>
  )
}

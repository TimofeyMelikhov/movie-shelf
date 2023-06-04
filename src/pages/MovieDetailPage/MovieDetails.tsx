import React from 'react'
import { useParams } from 'react-router-dom'

export const MovieDetails: React.FC = () => {

  const params = useParams<'id'>()

  return (
    <div>
      <h2>Здесь будет детальное описание фильма {params.id}</h2>
    </div>
  )
}

import React from 'react'
import { ISequelPrequel } from '../../models/IMovieModels'
import { useNavigate } from 'react-router-dom'

interface ISequelPrequelProps {
	prequelMovies: ISequelPrequel
}

export function PrequelsMovies({prequelMovies}: ISequelPrequelProps) {

	const navigate = useNavigate()

  const clickHandler = () => {
    navigate(`/film/${prequelMovies.filmId}`)
  }

  return (
    <div className='flex flex-col max-w-[200px] cursor-pointer' onClick={clickHandler}>
      <div>
				<img src={prequelMovies.posterUrlPreview} alt="poster"/>
			</div>
			<div>
				<p className='text-[15px]'> {prequelMovies.nameRu} </p>
			</div>
		</div>
  )
}

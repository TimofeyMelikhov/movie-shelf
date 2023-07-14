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
      <div className='relative'>
        <img
          src={prequelMovies.posterUrlPreview}
          className='max-w-[150px] max-h-[200px]'
          alt='poster'
        />
        <div className='absolute inset-0 bg-black opacity-0 transition-opacity duration-300 hover:opacity-20'></div>
      </div>
      <div className='max-w-[150px]'>
        <p className='text-[15px]'>{prequelMovies.nameRu}</p>
      </div>
    </div>
  )
}

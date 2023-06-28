import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import classes from './MovieDetails.module.css'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchDetailsMovie } from '../../redux/actions/MoviesDetailAction'

export const MovieDetails: React.FC = () => {

  const {id} = useParams<'id'>()
  const dispatch = useAppDispatch()
  const details = useAppSelector(state => state.movieDetailReducer.detailMovie)

  useEffect(() => {
    dispatch(fetchDetailsMovie(id))
  }, [dispatch, id])

  function convertMinutesToHours(minutes: number ) {
    let hours = Math.floor(minutes / 60);
    let mins = minutes % 60;
    return (hours < 10 ? "0" : "") + hours + ":" + (mins < 10 ? "0" : "") + mins;
  }

  const countries = details?.countries.map(c => c.country).join(', ')
  const genres = details?.genres.map(c => c.genre).join(', ')
  const movieTime = details?.filmLength ? `${details?.filmLength} мин. / ${convertMinutesToHours(details?.filmLength)}` : 'Неизвестно'
  const slogan = details?.slogan ? `«${details?.slogan}»` : '—'
  const ratingCount = details?.ratingKinopoiskVoteCount.toLocaleString('ru-RU')
  const ageRaiting = Number(details?.ratingAgeLimits.match(/\d+/))
  
  return (
    <div className='container flex mx-auto pt-5 max-w-[960px]'>
      <div className='flex flex-col'>
        <img src={details?.posterUrl} alt="poster" />
      </div>
      <div className='flex flex-col ml-[40px] max-w-[50%]'>
        <h1 className={classes.header}>{ details?.nameRu } ({details?.year})</h1>
        <div className={classes.origName}>{details?.nameOriginal} {`${ageRaiting}+`}</div>
        <div>Рейтинг Кинопоиска: { details?.ratingKinopoisk }</div>
        <div className='text-[14px]'> { ratingCount } оценок </div>
        <div className='mt-[50px] text-[22px]'>О Фильме</div>
        <div className='mt-[5px]'>Год производства: { details?.year }</div>
        <div className='mt-[5px]'>Страна: { countries }</div>
        <div className='mt-[5px]'>Жанр: { genres }</div>
        <div className='mt-[5px]'>Слоган: { slogan }</div>
        <div className='mt-[5px]'> Описание: { details?.description } </div>
        <div className='mt-[5px]'>Время: { movieTime }</div>
        <span className='w-[200px] bg-orange-500 py-[10px] px-[20px] rounded-2xl text-center mt-[10px] text-white'>
          <a href={`https://flicksbar.club/film/${id}/`} target='_blank' rel="noreferrer">Смотреть фильм</a>
        </span>
      </div>
    </div>
  )
}

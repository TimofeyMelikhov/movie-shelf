import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import classes from './MovieDetails.module.css'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchDetailsMovie, fetchStaffMovie } from '../../redux/actions/MoviesDetailAction'

export const MovieDetails: React.FC = () => {

  const {id} = useParams<'id'>()
  const dispatch = useAppDispatch()
  const { detailMovie, isError, isLoading, staff} = useAppSelector(state => state.movieDetailReducer)

  useEffect(() => {
    dispatch(fetchDetailsMovie(id))
    dispatch(fetchStaffMovie(id))
  }, [dispatch, id])

  function convertMinutesToHours(minutes: number ) {
    let hours = Math.floor(minutes / 60);
    let mins = minutes % 60;
    return (hours < 10 ? "0" : "") + hours + ":" + (mins < 10 ? "0" : "") + mins;
  }

  const countries = detailMovie?.countries.map(c => c.country).join(', ')
  const genres = detailMovie?.genres.map(c => c.genre).join(', ')
  const movieTime = detailMovie?.filmLength ? `${detailMovie?.filmLength} мин. / ${convertMinutesToHours(detailMovie?.filmLength)}` : 'Неизвестно'
  const slogan = detailMovie?.slogan ? `«${detailMovie?.slogan}»` : '—'
  const ratingCount = detailMovie?.ratingKinopoiskVoteCount.toLocaleString('ru-RU')
  const ageRaiting = detailMovie?.ratingAgeLimits ? Number(detailMovie?.ratingAgeLimits?.match(/\d+/)) + '+' : null
  const highlitedRating = detailMovie?.ratingKinopoisk && detailMovie.ratingKinopoisk >= 7 ? classes.high_rating : detailMovie?.ratingKinopoisk &&
   detailMovie.ratingKinopoisk >= 5.1 && detailMovie.ratingKinopoisk <= 6.9 ? classes.medium_rating : classes.low_rating
  
  return (
    <>
      { isLoading && <p>Loading...</p> }
      { isError && <p>{isError}</p> }

      <div className='container flex mx-auto pt-5 max-w-[960px]'>
        <div className='flex flex-col'>
          <img src={detailMovie?.posterUrl} alt="poster" />
        </div>
        <div className='flex flex-col ml-[40px] max-w-[50%]'>
          <h1 className={classes.header}>{ detailMovie?.nameRu } ({detailMovie?.year})</h1>
          <div className={classes.origName}>{detailMovie?.nameOriginal} {ageRaiting}</div>
          <div>Рейтинг Кинопоиска: <span className={highlitedRating}>{ detailMovie?.ratingKinopoisk }</span></div>
          <div className='text-[14px]'> { ratingCount } оценок </div>
          <div className='mt-[50px] text-[22px]'>О Фильме</div>
          <div className='mt-[5px]'>Год производства: { detailMovie?.year }</div>
          <div className='mt-[5px]'>Страна: { countries }</div>
          <div className='mt-[5px]'>Жанр: { genres }</div>
          <div className='mt-[5px]'>Слоган: { slogan }</div>
          <div className='mt-[5px]'>Режиссер: { slogan }</div>
          <div className='mt-[5px]'>Сценарий: { slogan }</div>
          <div className='mt-[5px]'>Продюсер: { slogan }</div>
          <div className='mt-[5px]'>Оператор: { slogan }</div>
          <div className='mt-[5px]'>Композитор: { slogan }</div>
          <div className='mt-[5px]'>Художник: { slogan }</div>
          <div className='mt-[5px]'>Монтаж: { slogan }</div>
          <div className='mt-[5px]'> Описание: { detailMovie?.description } </div>
          <div className='mt-[5px]'>Время: { movieTime }</div>
          <span className='w-[200px] bg-orange-500 py-[10px] px-[20px] rounded-2xl text-center mt-[10px] text-white'>
            <a href={`https://flicksbar.club/film/${id}/`} target='_blank' rel="noreferrer">Смотреть фильм</a>
          </span>
        </div>
      </div>
    </>
  )
}

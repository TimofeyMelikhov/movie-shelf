import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import classes from './MovieDetails.module.css'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchDetailsMovie, fetchStaffMovie } from '../../redux/actions/MoviesDetailAction'
import { NavLink } from 'react-router-dom'

export const MovieDetails: React.FC = () => {

  const {id} = useParams<'id'>()
  const dispatch = useAppDispatch()
  const { detailMovie, isError, isLoading, staff } = useAppSelector(state => state.movieDetailReducer)

  useEffect(() => {
    dispatch(fetchDetailsMovie(id))
    dispatch(fetchStaffMovie(id))
  }, [dispatch, id])

  function convertMinutesToHours(minutes: number ) {
    let hours = Math.floor(minutes / 60);
    let mins = minutes % 60;
    return (hours < 10 ? "0" : "") + hours + ":" + (mins < 10 ? "0" : "") + mins;
  }

  const generateStaffLinks = (professionKey: string) => {
    const filteredStaff = staff
      ?.filter(item => item.professionKey === professionKey)
      .map((item, index) => (
        item.nameRu ? 
          <React.Fragment key={item.staffId}>
            {index > 0 && ', '}
            <NavLink to={`/name/${item.staffId}`} className={classes.hov_staff}>
              {item.nameRu}
            </NavLink>
          </React.Fragment>
        :
          null
      ));
      return filteredStaff?.filter(item => item !== null);
  };

  const countries = detailMovie?.countries.map(c => c.country).join(', ')
  const genres = detailMovie?.genres.map(g => g.genre).join(', ')
  const movieTime = detailMovie?.filmLength ? `${detailMovie?.filmLength} мин. / ${convertMinutesToHours(detailMovie?.filmLength)}` : 'Неизвестно'
  const slogan = detailMovie?.slogan ? `«${detailMovie?.slogan}»` : '—'
  const ratingCount = detailMovie?.ratingKinopoiskVoteCount.toLocaleString('ru-RU')
  const ageRaiting = detailMovie?.ratingAgeLimits ? Number(detailMovie?.ratingAgeLimits?.match(/\d+/)) + '+' : null
  const highlitedRating = detailMovie?.ratingKinopoisk && detailMovie.ratingKinopoisk >= 7 ? classes.high_rating : detailMovie?.ratingKinopoisk &&
   detailMovie.ratingKinopoisk >= 5.1 && detailMovie.ratingKinopoisk <= 6.9 ? classes.medium_rating : classes.low_rating

  const director = generateStaffLinks('DIRECTOR');
  const writer = generateStaffLinks('WRITER');
  const producer = generateStaffLinks('PRODUCER');
  const operator = generateStaffLinks('OPERATOR');
  const composer = generateStaffLinks('COMPOSER');
  const design = generateStaffLinks('DESIGN');
  const editor = generateStaffLinks('EDITOR');

  console.log(design)
  
  return (
    <>
      { isLoading && <p>Loading...</p> }
      { isError && <p>{isError}</p> }

      <div className='container flex mx-auto pt-5 max-w-[1200px]'>
        <div className='flex flex-col'>
          <img src={detailMovie?.posterUrl} alt="poster" />
        </div>
        <div className='flex flex-col ml-[40px] max-w-[50%]'>
          <h1 className={classes.header}>{ detailMovie?.nameRu } ({detailMovie?.year})</h1>
          <div className={classes.origName}>{detailMovie?.nameOriginal} {ageRaiting}</div>
          <div>Рейтинг Кинопоиска: <span className={highlitedRating}>{ detailMovie?.ratingKinopoisk }</span></div>
          <div className='text-[14px]'> { ratingCount } оценок </div>
          <div className='mt-[50px] text-[22px]'>О Фильме</div>
          <div className='mt-[5px] text-[13px]'>
            <span className='text-gray-600'> Год производства:  </span>
            <span className='pl-[30px]'> { detailMovie?.year } </span> 
          </div>
          <div className='mt-[5px] text-[13px]'>
            <span className='text-gray-600'> Страна: </span> 
            <span className='pl-[30px]'> { countries } </span>
          </div>
          <div className='mt-[5px] text-[13px]'>
            <span className='text-gray-600'>Жанр: </span> 
            <span className='pl-[30px]'>{ genres }</span>
          </div>
          <div className='mt-[5px] text-[13px]'>
            <span className='text-gray-600'>Слоган: </span> 
            <span className='pl-[30px]'>{ slogan }</span>
          </div>
          <div className='mt-[5px] text-[13px]'>
            <span className='text-gray-600'>Режиссер: </span> 
            <span className='pl-[30px]'>{ director }</span>
            </div>
          <div className='mt-[5px] text-[13px]'>
            <span className='text-gray-600'>Сценарий: </span> 
            <span className='pl-[30px]'>{ writer }</span>
          </div>
          <div className='mt-[5px] text-[13px]'>
            <span className='text-gray-600'>Продюсер: </span> 
            <span className='pl-[30px]'>{ producer }</span>
          </div>
          <div className='mt-[5px] text-[13px]'>
            <span className='text-gray-600'>Оператор: </span> 
            <span className='pl-[30px]'>{ operator }</span>
          </div>
          <div className='mt-[5px] text-[13px]'>
            <span className='text-gray-600'>Композитор: </span> 
            <span className='pl-[30px]'>{ composer }</span>
          </div>
          <div className='mt-[5px] text-[13px]'>
            <span className='text-gray-600'>Художник: </span> 
            <span className='pl-[30px]'>{ design }</span>
          </div>
          <div className='mt-[5px] text-[13px]'>
            <span className='text-gray-600'>Монтаж: </span> 
            <span className='pl-[30px]'>{ editor }</span>
          </div>
          <div className='mt-[5px] text-[13px]'>
            <span className='text-gray-600'>Описание: </span> 
            <span className='pl-[30px]'>{ detailMovie?.description } </span>
          </div>
          <div className='mt-[5px] text-[13px]'>
            <span className='text-gray-600'>Время: </span> 
            <span className='pl-[30px]'>{ movieTime }</span>
          </div>
          <span className='w-[200px] bg-orange-500 py-[10px] px-[20px] rounded-2xl text-center mt-[10px] text-white'>
            <a href={`https://flicksbar.club/film/${id}/`} target='_blank' rel="noreferrer">Смотреть фильм</a>
          </span>
        </div>
      </div>
    </>
  )
}

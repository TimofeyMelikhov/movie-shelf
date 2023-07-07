import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import classes from './MovieDetails.module.css'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchBudgetMovie, fetchDetailsMovie, fetchStaffMovie } from '../../redux/actions/MoviesDetailAction'
import { NavLink } from 'react-router-dom'

export const MovieDetails: React.FC = () => {

  const {id} = useParams<'id'>()
  const dispatch = useAppDispatch()
  const { detailMovie, isError, isLoading, staff, budget } = useAppSelector(state => state.movieDetailReducer)

  useEffect(() => {
    dispatch(fetchDetailsMovie(id))
    dispatch(fetchStaffMovie(id))
    dispatch(fetchBudgetMovie(id))
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
    return filteredStaff?.filter(item => item !== null).splice(0, 3);
  };
  const generateActorLinks = (professionKey: string) => {
    const filteredStaff = staff
      ?.filter(item => item.professionKey === professionKey)
      .map(item => (
        item.nameRu ? 
          <React.Fragment key={item.staffId}>
            <NavLink to={`/name/${item.staffId}`} className={classes.hov_staff}>
              {item.nameRu}
            </NavLink>
          </React.Fragment>
        :
          null
      ));
    return filteredStaff?.filter(item => item !== null).splice(0, 10);
  };

  const getterBudget = (typeBudget: string) => {
    return budget?.filter(item => item.type === typeBudget)
      .map(item => {
        const amount = item.amount.toLocaleString()
        return item.symbol + amount
      })
  }

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
  const mainActor = generateActorLinks('ACTOR')

  const movieBudget = getterBudget('BUDGET')
  const usaBudget = getterBudget('USA')
  const worldBudget = getterBudget('WORLD')
  const ruBudget = getterBudget('RUS')
  
  return (
    <>
      { isLoading && <p>Loading...</p> }
      { isError && <p>{isError}</p> }

      <div className='container flex mx-auto pt-5 max-w-[1300px] bg-white'>
        <div className='flex flex-col ml-[40px]'>
          <img src={detailMovie?.posterUrl} alt="poster" className='mb-[25px]'/>
          <iframe
            width="300"
            height="200"
            src={`https://www.youtube.com/embed/jfPWtgQdb_Y`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className='flex flex-col ml-[40px] max-w-[45%]'>
          <h1 className={classes.header}>{ detailMovie?.nameRu } ({detailMovie?.year})</h1>
          <div className={classes.origName}>{detailMovie?.nameOriginal} {ageRaiting}</div>
          <div>Рейтинг Кинопоиска: <span className={highlitedRating}>{ detailMovie?.ratingKinopoisk }</span></div>
          <div className='text-[14px]'> { ratingCount } оценок </div>
          <div className='mt-[50px] text-[22px]'>О Фильме</div>
          <div className='mt-[10px] text-[13px]'>
            <span className='text-gray-600 inline-flex w-[180px]'> Год производства  </span>
            <span > { detailMovie?.year } </span> 
          </div>
          <div className='mt-[10px] text-[13px]'>
            <span className='text-gray-600 inline-flex w-[180px]'> Страна </span> 
            <span > { countries } </span>
          </div>
          <div className='mt-[10px] text-[13px]'>
            <span className='text-gray-600 inline-flex w-[180px]'>Жанр </span> 
            <span >{ genres }</span>
          </div>
          <div className='mt-[10px] text-[13px] text-gray-600'>
            <span className='inline-flex w-[180px]'>Слоган </span> 
            <span >{ slogan }</span>
          </div>
          <div className='mt-[10px] text-[13px]'>
            <span className='text-gray-600 inline-flex w-[180px]'>Режиссер </span> 
            <span >{ director }</span>
            </div>
          <div className='mt-[10px] text-[13px]'>
            <span className='text-gray-600 inline-flex w-[180px]'>Сценарий </span> 
            <span >{ writer }</span>
          </div>
          <div className='mt-[10px] text-[13px]'>
            <span className='text-gray-600 inline-flex w-[180px]'>Продюсер </span> 
            <span >{ producer }</span>
          </div>
          <div className='mt-[10px] text-[13px]'>
            <span className='text-gray-600 inline-flex w-[180px]'>Оператор </span> 
            <span >{ operator }</span>
          </div>
          <div className='mt-[10px] text-[13px]'>
            <span className='text-gray-600 inline-flex w-[180px]'>Композитор </span> 
            <span >{ composer }</span>
          </div>
          <div className='mt-[10px] text-[13px]'>
            <span className='text-gray-600 inline-flex w-[180px]'>Художник </span> 
            <span >{ design }</span>
          </div>
          <div className='mt-[10px] text-[13px]'>
            <span className='text-gray-600 inline-flex w-[180px]'>Монтаж </span> 
            <span >{ editor }</span>
          </div>
          <div className='mt-[10px] text-[13px]'>
            <span className='text-gray-600 inline-flex w-[180px]'>Бюджет </span> 
            <span >{ movieBudget }</span>
          </div>
          <div className='mt-[10px] text-[13px]'>
            <span className='text-gray-600 inline-flex w-[180px]'>Сборы в США </span> 
            <span >{ usaBudget }</span>
          </div>
          <div className='mt-[10px] text-[13px]'>
            <span className='text-gray-600 inline-flex w-[180px]'>Сборы в мире </span> 
            <span >{ worldBudget }</span>
          </div>
          <div className='mt-[10px] text-[13px]'>
            <span className='text-gray-600 inline-flex w-[180px]'>Сборы в России </span> 
            <span >{ ruBudget }</span>
          </div>
          <div className='mt-[10px] text-[13px]'>
            <span className='text-gray-600 inline-flex w-[180px]'>Премьера в России </span> 
            <span > — </span>
          </div>
          <div className='mt-[10px] text-[13px]'>
            <span className='text-gray-600 inline-flex w-[180px]'>Премьера в мире </span> 
            <span > — </span>
          </div>
          <div className='mt-[10px] text-[13px]'>
            <span className='inline-flex w-[180px]'>Возраст</span> 
            <span className=' border-2 p-[5px]'>{ ageRaiting }</span>
          </div>
          <div className='mt-[10px] text-[13px] text-gray-600'>
            <span className='inline-flex w-[180px]'>Время</span> 
            <span className=' '>{ movieTime }</span>
          </div>
          <div className='mt-[25px] text-[13px]'>
            { detailMovie?.description } 
          </div>
          <span className='w-[200px] bg-orange-500 py-[10px] px-[20px] rounded-2xl text-center mt-[10px] mb-[30px] text-white'>
            <a href={`https://flicksbar.club/film/${id}/`} target='_blank' rel="noreferrer">Смотреть фильм</a>
          </span>
        </div>
        <div className='flex flex-col ml-[40px] mt-[180px]'>
          <h4> В главных ролях ›</h4>
          <div className='flex flex-col mt-[10px] text-[13px]'>
            { mainActor }
          </div>
        </div>
      </div>
    </>
  )
}

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import classes from './MovieDetails.module.css'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchBudgetMovie, fetchDetailsMovie, fetchDistributionMovie, fetchPrequelMovies, fetchStaffMovie, fetchFactsMovie } from '../../redux/actions/MoviesDetailAction'
import { NavLink } from 'react-router-dom'
import { formatDate, convertMinutesToHours,} from '../../utils/formatter'
import { PrequelsMovies } from './PrequelsMovies'
import { Preloader } from '../../components/preloader/Preloader'

export const MovieDetails: React.FC = () => {

  const {id} = useParams<'id'>()
  const dispatch = useAppDispatch()
  const { detailMovie, isLoading, staff, budget, distribution, prequelMovies, facts } = useAppSelector(state => state.movieDetailReducer)

  const [hasSequelsAndPrequels, setHasSequelsAndPrequels] = useState(false);

  useEffect(() => {
    dispatch(fetchDetailsMovie(id))
    dispatch(fetchStaffMovie(id))
    dispatch(fetchBudgetMovie(id))
    dispatch(fetchDistributionMovie(id))
    dispatch(fetchPrequelMovies(id, setHasSequelsAndPrequels))
    // dispatch(fetchFactsMovie(id))
  }, [dispatch, id])

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
  const movieTime = detailMovie?.filmLength ? `${detailMovie.filmLength} мин. / ${convertMinutesToHours(detailMovie.filmLength)}` : 'Неизвестно'
  const slogan = detailMovie?.slogan ? `«${detailMovie.slogan}»` : '—'
  const ratingCount = detailMovie?.ratingKinopoiskVoteCount.toLocaleString('ru-RU')
  const ageRaiting = detailMovie?.ratingAgeLimits ? Number(detailMovie.ratingAgeLimits?.match(/\d+/)) + '+' : null
  const highlitedRating = detailMovie?.ratingKinopoisk && detailMovie.ratingKinopoisk >= 7 ? classes.high_rating : detailMovie?.ratingKinopoisk &&
    detailMovie.ratingKinopoisk >= 5.1 && detailMovie.ratingKinopoisk <= 6.9 ? classes.medium_rating : classes.low_rating
    const premierInRussiaDate = distribution?.filter(item => (item.type === 'PREMIERE' || item.type === 'COUNTRY_SPECIFIC') &&  
    (item.country && item.country.country === "Россия")).map(item => item.date)[0]
  const worldPremierDate = distribution?.filter(item => item.type === 'WORLD_PREMIER').map(item => item.date)
  const distributionOnBluDate = distribution?.filter(item => item.subType === 'BLURAY').map(item => item.date)[0]
  const distributionOnDvdDate = distribution?.filter(item => item.subType === 'DVD').map(item => item.date)[0]

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

  const formatWorldPremier = formatDate(String(worldPremierDate))
  const formatRussianPremier = formatDate(String(premierInRussiaDate))
  const formatDistributionOnBlu = formatDate(String(distributionOnBluDate))
  const formatDistributionOnDvd = formatDate(String(distributionOnDvdDate))
  
  return (
    <>
      { isLoading ? 
          <Preloader /> 
        :
        <div className='container flex mx-auto pt-5 max-w-[1300px] bg-white justify-evenly'>
          <div className='flex flex-col'>
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
          <div className='flex flex-col ml-[40px] max-w-[55%]'>
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
              <span > { formatRussianPremier } </span>
            </div>
            <div className='mt-[10px] text-[13px]'>
              <span className='text-gray-600 inline-flex w-[180px]'>Премьера в мире </span> 
              <span > { formatWorldPremier } </span>
            </div>
            <div className='mt-[10px] text-[13px] text-gray-600'>
              <span className='inline-flex w-[180px]'>Релиз на DVD </span> 
              <span> { formatDistributionOnDvd } </span>
            </div>
            <div className='mt-[10px] text-[13px] text-gray-600'>
              <span className='inline-flex w-[180px]'>Релиз на Blu-ray </span> 
              <span > { formatDistributionOnBlu } </span>
            </div>
            <div className='mt-[10px] text-[13px]'>
              <span className='inline-flex w-[180px]'>Возраст</span> 
              <span className=' border-2 p-[5px]'>{ ageRaiting }</span>
            </div>
            <div className='mt-[10px] text-[13px] text-gray-600'>
              <span className='inline-flex w-[180px]'>Время</span> 
              <span>{ movieTime }</span>
            </div>
            <div className='mt-[25px] text-[13px]'>
              { detailMovie?.description } 
            </div>
            <span className='w-[200px] bg-orange-500 py-[10px] px-[20px] rounded-2xl text-center mt-[10px] mb-[10px] text-white'>
              <a href={`https://flicksbar.club/film/${id}/`} target='_blank' rel="noreferrer">Смотреть фильм</a>
            </span>
            { hasSequelsAndPrequels &&
              <div className='mb-[30px] w-[110%]'>
                <h1 className='text-[22px]'>Сиквелы и приквелы ›</h1>
                <div className='flex justify-between'>
                  {
                    prequelMovies?.map(item => <PrequelsMovies key={item.filmId} prequelMovies={item} />)
                  }
                </div>
              </div>
            }
            {/* <div className='flex-none mb-[15px]'>
              <h3>Знаете ли вы, что…</h3>
              {
                facts?.map((fact, index) => <div key={index} dangerouslySetInnerHTML={{ __html: fact.text }} className='border-b-2 mb-[25px] pb-[15px]'></div>)
              }
            </div> */}
          </div>
          <div className='flex flex-col mt-[180px] max-h-[500px]'>
            <h4> В главных ролях ›</h4>
            <div className='flex flex-col mt-[10px] text-[13px]'>
              { mainActor }
            </div>
          </div>
        </div>
      }
    </>
  )
}

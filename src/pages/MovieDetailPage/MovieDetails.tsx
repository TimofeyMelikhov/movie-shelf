import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import classes from './MovieDetails.module.css'
import { NavLink } from 'react-router-dom'
import { formatDate, convertMinutesToHours,} from '../../utils/formatter'
import { RelatedFilms } from './RelatedFilms'
import { Preloader } from '../../components/preloader/Preloader'
import {
  useGetCombineDataOnMovieQuery
} from '../../redux/movies.api'
import { Reviews } from '../../components/reviews/Reviews'

export const MovieDetails: React.FC = () => {

  const {id} = useParams<'id'>()

  const { data, isLoading } = useGetCombineDataOnMovieQuery(id)

  const [hasSequelsAndPrequels, setHasSequelsAndPrequels] = useState(false);


  useEffect(() => {
    if (data?.PrequelMovies?.length) setHasSequelsAndPrequels(true)
  }, [data?.PrequelMovies?.length])

  const generateStaffLinks = (professionKey: string) => {
    const filteredStaff = data?.staff
      .filter(item => item.professionKey === professionKey)
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
    const filteredStaff = data?.staff
      .filter(item => item.professionKey === professionKey)
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
    return data?.budget?.items.filter(item => item.type === typeBudget)
      .map(item => {
        const amount = item.amount.toLocaleString()
        return item.symbol + amount
      })
  }

  const countries = data?.movieDetails.countries.map(c => c.country).join(', ')
  const genres = data?.movieDetails.genres.map(g => g.genre).join(', ')
  const movieTime = data?.movieDetails.filmLength ? `${data?.movieDetails.filmLength} мин. / ${convertMinutesToHours(data?.movieDetails.filmLength)}` : 'Неизвестно'
  const slogan = data?.movieDetails.slogan ? `«${data?.movieDetails.slogan}»` : '—'
  const ratingCount = data?.movieDetails.ratingKinopoiskVoteCount.toLocaleString('ru-RU')
  const ageRaiting = data?.movieDetails.ratingAgeLimits ? Number(data?.movieDetails.ratingAgeLimits?.match(/\d+/)) + '+' : null
  const highlitedRating = data?.movieDetails.ratingKinopoisk && data?.movieDetails.ratingKinopoisk >= 7 ? classes.high_rating : data?.movieDetails.ratingKinopoisk &&
    data?.movieDetails.ratingKinopoisk >= 5.1 && data?.movieDetails.ratingKinopoisk <= 6.9 ? classes.medium_rating : classes.low_rating
  const premierInRussiaDate = data?.distribution.items.filter(item => (item.type === 'PREMIERE' || item.type === 'COUNTRY_SPECIFIC') &&  
    (item.country && item.country.country === "Россия")).map(item => item.date)[0]
  const worldPremierDate = data?.distribution.items.filter(item => item.type === 'WORLD_PREMIER').map(item => item.date)
  const distributionOnBluDate = data?.distribution.items.filter(item => item.subType === 'BLURAY').map(item => item.date)[0]
  const distributionOnDvdDate = data?.distribution.items.filter(item => item.subType === 'DVD').map(item => item.date)[0]

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

  const trailer = data?.movieTrailers.items.filter(item => item.site === 'YOUTUBE' && item.name.toLocaleLowerCase().includes('трейлер'))[0].url

  function extractVideoToken(url: string | undefined): string | null {
    if (url === undefined) {
        return null;
    }

    let token: string | null = null;
    
    if (url.includes('watch?v=')) {
        token = url.split('watch?v=')[1];
    } else if (url.includes('youtu.be/')) {
        token = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('youtube.com/v/')) {
        token = url.split('youtube.com/v/')[1];
    }
    
    return token;
}

const tokenTrailer = extractVideoToken(trailer)

  return (
    <>
      { isLoading ? <Preloader /> :
        <div className='container mx-auto pt-5 max-w-[1300px] bg-white '>
          <div className=' flex justify-evenly'>
            <div className='flex flex-col'>
              <img src={data?.movieDetails?.posterUrl} alt="poster" className='mb-[25px]'/>
              <iframe
                width="300"
                height="200"
                src={`https://www.youtube.com/embed/${tokenTrailer}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className='flex flex-col ml-[40px] max-w-[55%]'>
              <h1 className={classes.header}>{ data?.movieDetails?.nameRu } ({data?.movieDetails?.year})</h1>
              <div className={classes.origName}>{data?.movieDetails?.nameOriginal} {ageRaiting}</div>
              <div>Рейтинг Кинопоиска: <span className={highlitedRating}>{ data?.movieDetails?.ratingKinopoisk }</span></div>
              <div className='text-[14px]'> { ratingCount } оценок </div>
              <div className='mt-[50px] text-[22px]'>О Фильме</div>
              <div className='mt-[10px] text-[13px]'>
                <span className='text-gray-600 inline-flex w-[180px]'> Год производства  </span>
                <span > { data?.movieDetails?.year } </span> 
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
              
              {director?.length !== 0 &&
                <div className='mt-[10px] text-[13px]'>
                  <span className='text-gray-600 inline-flex w-[180px]'>Режиссер </span> 
                  <span >{ director }</span>
                </div>
              }

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

              {usaBudget?.length !== 0 &&
                <div className='mt-[10px] text-[13px]'>
                  <span className='text-gray-600 inline-flex w-[180px]'>Сборы в США </span> 
                  <span >{ usaBudget }</span>
                </div>
              }
 
              {worldBudget?.length !== 0 &&
                <div className='mt-[10px] text-[13px]'>
                  <span className='text-gray-600 inline-flex w-[180px]'>Сборы в мире </span> 
                  <span >{ worldBudget }</span>
                </div>
              }

              {ruBudget?.length !== 0 &&
                <div className='mt-[10px] text-[13px]'>
                  <span className='text-gray-600 inline-flex w-[180px]'>Сборы в России </span> 
                  <span >{ ruBudget }</span>
                </div>
              }

              {premierInRussiaDate &&
                <div className='mt-[10px] text-[13px]'>
                  <span className='text-gray-600 inline-flex w-[180px]'>Премьера в России </span> 
                    <span > { formatRussianPremier } </span>
                </div>
              }

              <div className='mt-[10px] text-[13px]'>
                <span className='text-gray-600 inline-flex w-[180px]'>Премьера в мире </span> 
                <span> { formatWorldPremier } </span>
              </div>

              {distributionOnDvdDate &&
                <div className='mt-[10px] text-[13px] text-gray-600'>
                  <span className='inline-flex w-[180px]'>Релиз на DVD </span> 
                  <span> { formatDistributionOnDvd } </span>
                </div>
              }

              {distributionOnBluDate &&
                <div className='mt-[10px] text-[13px] text-gray-600'>
                  <span className='inline-flex w-[180px]'>Релиз на Blu-ray </span> 
                  <span > { formatDistributionOnBlu } </span>
                </div>
              }

              {ageRaiting &&
                <div className='mt-[10px] text-[13px]'>
                  <span className='inline-flex w-[180px]'>Возраст</span> 
                  <span className=' border-2 p-[5px]'>{ ageRaiting }</span>
                </div>
              }

              <div className='mt-[10px] text-[13px] text-gray-600'>
                <span className='inline-flex w-[180px]'>Время</span> 
                <span>{ movieTime }</span>
              </div>

              <div className='mt-[25px] text-[13px]'>
                { data?.movieDetails?.description } 
              </div>

              <span className='w-[200px] bg-orange-500 py-[10px] px-[20px] rounded-2xl text-center mt-[10px] mb-[40px] text-white'>
                <a href={`https://flicksbar.club/film/${id}/`} target='_blank' rel="noreferrer">Смотреть фильм</a>
              </span>

            </div>

            <div className='flex flex-col mt-[180px] max-h-[500px]'>
              <h4> В главных ролях ›</h4>
              <div className='flex flex-col mt-[10px] text-[13px]'>
                { mainActor }
              </div>
            </div>

          </div>

          <div className='flex-none ml-[30px] mr-[30px]'>
            { hasSequelsAndPrequels &&
              <div className='mb-[30px]'>
                <h3 className='text-[24px]'>Сиквелы и приквелы ›</h3>
                <div className='flex ml=[30px] mt-[15px]'>
                  {data?.PrequelMovies && <RelatedFilms relatedFilms={data?.PrequelMovies} />}
                </div>
              </div>
            }

            {data?.SimilarsMovie.items.length !== 0 &&
              <div className='mb-[30px]'>
                <h3 className='text-[24px]'>Если вам понравился этот фильм ›</h3>
                <div className='flex ml=[30px] mt-[15px]'>
                {data?.SimilarsMovie && <RelatedFilms relatedFilms={data?.SimilarsMovie.items} />}
                </div>
              </div>
            }

            {data?.FactsMovie?.items.length !== 0 &&
              <div className='pb-[25px] max-w-[70%]'>
                <h3 className='text-[24px]'>Знаете ли вы, что…</h3>
                {
                  data?.FactsMovie?.items.slice(0, 3).map((fact, index) => <div key={index} dangerouslySetInnerHTML={{ __html: fact.text }} className='border-b-2 mt-[25px] pb-[15px]'></div>)
                }
              </div>
            }



            <div className='flex'>
              <div>
              {
                data?.reviewsMovie.items.map(review => (
                  <Reviews key={review.kinopoiskId} reviews={review}/>
                ))
              }
              </div>
              <div className='ml-[15px] text-[28px]'>

                <div className='flex flex-col pl-[5px] border-l-2 border-red-600'>
                  <div className=''> {data?.reviewsMovie.total} </div>
                  <span className='text-[12px]'>Всего</span>
                </div>

                <div className='flex flex-col mt-[10px]'>
                  <div> 
                    <span className='text-[#3bb33b]'> {data?.reviewsMovie.totalPositiveReviews} </span>
                    <span className='text-[14px]'>
                      {data?.reviewsMovie.totalPositiveReviews && ((data?.reviewsMovie.totalPositiveReviews * 100) / data?.reviewsMovie.total).toFixed(2)}%
                    </span>
                  </div>
                  <span className='text-[12px]'>Положительные</span>
                </div>

                <div className='flex flex-col mt-[10px]'>
                  <div>
                    <span className='text-[#ff0000]'> {data?.reviewsMovie.totalNegativeReviews} </span>
                    <span className='text-[14px]'>
                      {data?.reviewsMovie.totalNegativeReviews && ((data?.reviewsMovie.totalNegativeReviews * 100) / data?.reviewsMovie.total).toFixed(2)}%
                    </span>
                  </div>
                  <span className='text-[12px]'>Отрицательные</span>
                </div>

                <div className='flex flex-col mt-[10px]'>
                  <div>
                    <span className='text-[#777]'> {data?.reviewsMovie.totalNeutralReviews} </span>
                    <span className='text-[14px]'>
                      {data?.reviewsMovie.totalNeutralReviews && ((data?.reviewsMovie.totalNeutralReviews * 100) / data?.reviewsMovie.total).toFixed(2)}%
                    </span>
                  </div>
                  <span className='text-[12px]'>Нейтральные</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      }
    </>
  )
}

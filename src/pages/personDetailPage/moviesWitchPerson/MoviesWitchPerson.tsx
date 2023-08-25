import React from 'react'
import { IPersonFilms } from '../../../models/IMovieModels'

interface IMoviesPersonProp {
  personMovies?: IPersonFilms[]
}

export const MoviesWitchPerson: React.FC<IMoviesPersonProp> = ({personMovies}) => {

  const films = personMovies?.filter(item => item.professionKey === 'ACTOR')

  // const highlitedRating =
  // personMovies?.rating &&
  // data?.movieDetails.ratingKinopoisk >= 7
  //   ? classes.high_rating
  //   : data?.movieDetails.ratingKinopoisk &&
  //     data?.movieDetails.ratingKinopoisk >= 5.1 &&
  //     data?.movieDetails.ratingKinopoisk <= 6.9
  //   ? classes.medium_rating
  //   : classes.low_rating;

  return (
    <div>
      {
        films?.map(item => 
          <div key={item.filmId}>
            <div className='flex justify-around mb-[10px]'>
              <div className='flex flex-col'>
                <span> {item.nameRu} </span>
                <span className='text-[12px]'> {item.nameEn} </span>
              </div>
              <div >
                {item.rating}
              </div>
            </div>
          </div>  
        )
      }
    </div>
  )
}

import React from 'react'
import { IPersonFilms } from '../../../models/IMovieModels'
import classes from './moviesWitchPerson.module.css'
import { NavLink } from 'react-router-dom'

interface IMoviesPersonProp {
  personMovies?: IPersonFilms[]
}

export const MoviesWitchPerson: React.FC<IMoviesPersonProp> = ({personMovies}) => {

  const films = personMovies?.filter(item => item.professionKey === 'ACTOR')

  return (
    <div>
      {
        films?.map(item => 
          <div key={item.filmId} className='border-b-2 hover:bg-gray-100 px-2 px-4'>
            <NavLink to={`/film/${item.filmId}`}>
              <div className='flex justify-between mb-[10px]'>
                <div className='flex flex-col'>
                  <span> {item.nameRu} </span>
                  <span className='text-[12px]'> {item.nameEn} </span>
                </div>
                <div className={
                  item?.rating >= '7'
                  ? classes.high_rating
                  : item?.rating &&
                  item?.rating >= '5.1' &&
                  item?.rating <= '6.9'
                  ? classes.medium_rating
                  : classes.low_rating
                }>
                  {item.rating}
                </div>
              </div>
            </NavLink>
          </div>  
        )
      }
    </div>
  )
}

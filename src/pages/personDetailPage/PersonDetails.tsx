import React, { MouseEventHandler, useState } from 'react'
import classes from './personDetails.module.css'
import { useParams } from 'react-router-dom'
import { useGetDetailsPersonQuery } from '../../redux/movies.api'
import { formatDate } from '../../utils/formatter'
import { NavLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { addToFavoritePerson, removeFromFavorites } from '../../redux/slices/favoritePersonSlice'
import { MoviesWitchPerson } from './moviesWitchPerson/MoviesWitchPerson'

export function PersonDetails() {

  const {id} = useParams<'id'>()
  const { data: personDetail, isLoading, isError } = useGetDetailsPersonQuery(id)
  const favoritePerson = useAppSelector(state => state.favoritePerson)
  const dispatch = useAppDispatch()

  const isExistsInFavorite = favoritePerson.some(p => p.personId === personDetail?.personId)

  const [favoritePersonButton, setFavoritePersonButton] = useState(isExistsInFavorite)

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (): void => {
    setFavoritePersonButton(prev => !prev)
    if(personDetail) {
      if(!isExistsInFavorite) {
        dispatch(addToFavoritePerson(personDetail))
      } else {
        dispatch(removeFromFavorites(personDetail.personId))
      }
    }
  }

  const generateMovieLinks = () => {
    const bestFilteredMovie = personDetail?.films
      .filter(item => item.professionKey === 'ACTOR')
      .slice()
      .sort((a, b) => Number(b.rating) - Number(a.rating))
      .map(item => (
        item.nameRu ? 
          <React.Fragment key={item.filmId}>
            <NavLink to={`/film/${item.filmId}`} className={classes.hov_staff}>
              {item.nameRu}
            </NavLink>
          </React.Fragment>
        :
          null
      ));
    return bestFilteredMovie?.slice(0, 7);
  };

  const bestMovie = generateMovieLinks()

  return (
    <>
      { isLoading && <p>Loading...</p> }
      { isError && <p>{isError}</p> }

      <div className='container mx-auto p-5 max-w-[1024px] bg-white min-h-[100vh]'>
        <div className='flex'>
          <div className='flex flex-col'>
            <img src={personDetail?.posterUrl} alt="poster" />
          </div>
          <div className='flex flex-col ml-[40px]'>
            <h1 className={classes.header}>{ personDetail?.nameRu }</h1>
            <div className={classes.origName}>{personDetail?.nameEn}</div>
            <button 
              className={classes.buttonFav}
              onClick={clickHandler}
            >
              <span className={ !favoritePersonButton ? classes.heart : classes.heart_active}></span>
              Любимая звезда
            </button>
            <div className='mt-[50px] text-[22px]'>О персоне</div>
            <div className='mt-[5px]'>Карьера: { personDetail?.profession }</div>
            <div className='mt-[5px]'>Рост: { personDetail?.growth }</div>
            <div className='mt-[5px]'>Дата рождения: { formatDate(String(personDetail?.birthday)) } • { personDetail?.age } лет </div>
            <div className='mt-[5px]'>Место рождения: { personDetail?.birthplace }</div>
            {
              personDetail?.death && <div className='mt-[5px] text-gray-400'>Дата смерти: {formatDate(String(personDetail?.death))} </div>
            }
            {
              personDetail?.deathplace && <div className='mt-[5px] text-gray-400'>Место смерти: {personDetail?.deathplace} </div>
            }
          </div>
          <div className='flex flex-col ml-[70px] mt-[125px]'>
            <h3 className='text-[18px]'>Лучшие фильмы</h3>
            <div className='flex flex-col mt-[10px] text-[13px]'>
                { bestMovie }
              </div>
          </div>
        </div>
        <div className='mt-[30px]'>
          <h2 className='text-2xl'> Знаете ли вы, что… </h2>
          {
            personDetail?.facts.map((f, index) => <p key={index} className='mt-[7px] border-b-2'> {f} </p>).slice(0, 5)
          }
        </div>
        <div className='mt-[25px]'>
          <span className='text-[32px]'>Фильмы:</span>
          <MoviesWitchPerson personMovies={personDetail?.films}/>
        </div>
      </div>

    </>
  )
}

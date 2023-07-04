import React from 'react'
import { ISearchMovie, ISearchPerson } from '../../models/IMovieModels'
import { useNavigate } from 'react-router-dom'
import classes from './movieSearch.module.css'

interface searchProp {
  film: ISearchMovie,
  person?: ISearchPerson
  onClick: () => void
}

export function SearchResultElem({film, onClick}: searchProp) {

  const navigate = useNavigate()

  const clickHandler = () => {
    navigate(`film/${film?.filmId}`)
    onClick()
  }

  const highlitedRating = parseFloat(film?.rating) >= 7 ? classes.high_rating : parseFloat(film?.rating) >= 5.1 && parseFloat(film?.rating) <= 6.9 ?
   classes.medium_rating : classes.low_rating

  return (
    <div className={classes.item_container} onClick={clickHandler}>
      <div>
        <img src={film?.posterUrlPreview} style={{width: '32px', height: '48px'}} alt="poster" />
      </div>
      <div className='ml-[15px]'>
        <h4>{film?.nameRu}</h4>
        <div>
          <span className={highlitedRating}> { film?.rating} </span>
          <span> { film?.nameEn }, { film?.year } </span>
        </div>
      </div>
    </div>
  )
}

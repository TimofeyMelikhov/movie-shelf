import React from 'react'
import { ISearchPerson } from '../../models/IMovieModels'
import { useNavigate } from 'react-router-dom'
import classes from './movieSearch.module.css'

interface searchProp {
  person: ISearchPerson,
  onClick: () => void
}

export function SearchResultPerson({person, onClick}: searchProp) {

  const navigate = useNavigate()

  const clickHandler = () => {
    navigate(`name/${person?.kinopoiskId}`)
    onClick()
  }

  return (
    <div className={classes.item_container} onClick={clickHandler}>
      <div>
        <img src={person?.posterUrl} style={{width: '32px', height: '48px'}} alt="poster" />
      </div>
      <div className='ml-[15px]'>
        <h4>{person?.nameRu}</h4>
        <div>
          <span> { person?.nameEn } </span>
        </div>
      </div>
    </div>
  )
}

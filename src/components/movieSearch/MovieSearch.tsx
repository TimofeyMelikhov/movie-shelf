import React, { useEffect, useState } from 'react'
import classes from './movieSearch.module.css'
import { useInput } from '../../hooks/input'
import { useDebounce } from '../../hooks/debounce'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchSearchMovie } from '../../redux/actions/SearchMovieAction'
import { useNavigate } from 'react-router-dom'
import { SearchResultElem } from './SearchResultElem'

export function MovieSearch() {

  const dispatch = useAppDispatch()

  const { films } = useAppSelector(state => state.searchMovieReducer)

  const [dropdown, setDropdown] = useState(false)

  const input = useInput('')

  const navigate = useNavigate()

  const debounced = useDebounce<string>(input.value, 550)

  useEffect(() => {
    if (debounced.length > 3) {
      dispatch(fetchSearchMovie(debounced)).then(() => setDropdown(true))
    } else {
      setDropdown(false)
    }
  }, [debounced, dispatch])

  console.log(films)

  return (
    <div className={classes.serarch_container}>
      <input 
        type="text"
        className={classes.input_search}
        placeholder='Фильмы, сериалы, персоны'
        {...input}
      />

      {dropdown &&       
        <div className={classes.drop_down}>
          {
            films.map(film => (
              <SearchResultElem key={film.filmId} film={film} />
            ))
          }
        </div>
      }

    </div>
  )
}

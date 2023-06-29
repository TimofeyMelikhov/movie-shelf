import React, { useEffect } from 'react'
import classes from './movieSearch.module.css'
import { useInput } from '../../hooks/input'
import { useDebounce } from '../../hooks/debounce'
import axios from 'axios'

export function MovieSearch() {

  const input = useInput('')

  const debounced = useDebounce<string>(input.value, 550)

  async function searchMovies() {
    const response = await axios.get(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword`, 
      {
        headers: {
          'X-API-KEY': '03b257a3-99b3-43ff-be90-2f7b5b72e260',
          'Content-Type': 'application/json',
        },
        params: {
          keyword: debounced,
          page: 1
        }
      }
    )
  }

  useEffect(() => {
    if (debounced.length > 3) {
    }
  }, [debounced])

  return (
    <div className={classes.serarch_container}>
      <input 
        type="text"
        className={classes.input_search}
        placeholder='Фильмы, сериалы, персоны'
        {...input}
      />

      {/* <div className={classes.drop_down}>

      </div> */}

    </div>
  )
}

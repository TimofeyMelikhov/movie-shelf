import React, { useEffect } from 'react'
import classes from './movieSearch.module.css'
import { useInput } from '../../hooks/input'
import { useDebounce } from '../../hooks/debounce'

export function MovieSearch() {

  const input = useInput('')

  const debounced = useDebounce(input.value)

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

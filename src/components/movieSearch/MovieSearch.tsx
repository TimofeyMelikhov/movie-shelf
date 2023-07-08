import React, { useEffect, useState } from 'react';
import classes from './movieSearch.module.css';
import { useInput } from '../../hooks/input';
import { useDebounce } from '../../hooks/debounce';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchSearchMovie, fetchSearchPerson } from '../../redux/actions/SearchMovieAction';
import { SearchResultElem } from './SearchResultElem';
import { Preloader } from '../preloader/Preloader';

export function MovieSearch() {
  const dispatch = useAppDispatch();
  const { films, items, isLoading } = useAppSelector(state => state.searchMovieReducer);
  const [dropdown, setDropdown] = useState(false);
  const input = useInput('');

  const debounced = useDebounce<string>(input.value, 550);

  useEffect(() => {
    setDropdown(true);
    if (debounced.length >= 3) {
      dispatch(fetchSearchMovie(debounced));
      dispatch(fetchSearchPerson(debounced));
    } else {
      setDropdown(false);
    }
  }, [debounced, dispatch]);

  const clickHandler = () => {
    setDropdown(false);
    input.setvalue('');
  };

  return (
    <div className={classes.serarch_container}>
      <input
        type="text"
        className={`${classes.input_search} sm:w-64`} 
        placeholder='Фильмы, сериалы, персоны'
        value={input.value}
        onChange={input.onChange}
      />

      {dropdown &&
        <div className={`${classes.drop_down} sm:w-64`}>
          <p className='mb-[5px] ml-[15px] text-[14px] text-black'>Возможно, вы искали</p>
          {isLoading ? 
            <Preloader/> 
              :
            items.length ?
              films.map(film => (
                <SearchResultElem key={film.filmId} film={film} onClick={() => clickHandler()} />
              ))
              :
            <p className='text-black text-center'>По вашему запросу ничего не найдено</p>
          }
        </div>
      }
    </div>
  );
}

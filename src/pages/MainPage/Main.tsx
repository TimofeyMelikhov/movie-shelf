import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchMovies } from '../../redux/actions/MoviesAction'
import { Movies } from '../../components/movie/Movies'

export const MainPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { movies, isLoading, isError } = useAppSelector(state => state.moviesReducer)

  useEffect(() => {
    dispatch(fetchMovies())
  }, [dispatch])

  return (
    <div className='flex flex-wrap container mx-auto max-w-[960px] pt-5 justify-around'>

      { isLoading && <p>Loading...</p> }
      { isError && <p>{isError}</p> }

      { movies.map(movie => <Movies key={movie.kinopoiskId} movie={movie} />) }

    </div>
  );
}
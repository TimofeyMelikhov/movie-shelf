import axios from 'axios';
import { AppDispatch } from './index';
import { moviesFetching, moviesFetchingSuccess, moviesFetchingError } from './slices/moviesReducer'
import { IMovie } from '../models/IMovie';

export const fetchMovies = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(moviesFetching())
    const response = await axios.get<IMovie[]>('https://kinopoiskapiunofficial.tech/api/v2.2/films/301', 
      {
        headers: {
          'X-API-KEY': '03b257a3-99b3-43ff-be90-2f7b5b72e260',
          'Content-Type': 'application/json',
        }
      }
    )
    dispatch(moviesFetchingSuccess(response.data))
  } catch (e) {
    dispatch(moviesFetchingError(e as Error))
  }
}
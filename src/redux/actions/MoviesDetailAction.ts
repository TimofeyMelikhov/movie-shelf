import axios from 'axios';
import { AppDispatch } from '../index';
import { IMovieDetail } from '../../models/IMovieModels'
import { moviesDetailFetchingError, moviesDetailFetchingSuccess, IMovieDetailPayload } from '../slices/movieDetailSlice';

export const fetchDetailsMovie = (id: string | undefined) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios<IMovieDetail>(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`, 
        {
          headers: {
            'X-API-KEY': '03b257a3-99b3-43ff-be90-2f7b5b72e260',
            'Content-Type': 'application/json',
          }
        }
      )
      dispatch(moviesDetailFetchingSuccess(response.data))
  } catch (error) {
    const errorPayload: IMovieDetailPayload = {
      isLoading: false,
      error: error as Error,
    }
    dispatch(moviesDetailFetchingError(errorPayload))
  }
}
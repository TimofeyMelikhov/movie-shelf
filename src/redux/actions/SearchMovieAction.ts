import axios from '../../axios/index';
import { AppDispatch } from '../index';
import { IPayloadAction, ISearchMovieErrorPayload, searchFetching, searchMovieFetchingError, searchMovieFetchingSuccess } from '../slices/searchMovieSlice';

export const fetchSearchMovie = (debounced: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(searchFetching(true))
    const response = await axios.get<IPayloadAction>(`/v2.1/films/search-by-keyword`, 
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
  dispatch(searchMovieFetchingSuccess(response.data))
  } catch (error) {
    const errorPayload: ISearchMovieErrorPayload = {
      isLoading: false,
      error: error as Error,
    }
    dispatch(searchMovieFetchingError(errorPayload))
  }
}

export const fetchSearchPerson = (debounced: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get<IPayloadAction>('/v1/persons',
      {
        headers: {
          'X-API-KEY': '03b257a3-99b3-43ff-be90-2f7b5b72e260',
          'Content-Type': 'application/json',
        },
        params: {
          name: debounced,
          page: 1
        }
      }
    )
    dispatch(searchMovieFetchingSuccess(response.data))
  } catch (error) {
    const errorPayload: ISearchMovieErrorPayload = {
      isLoading: false,
      error: error as Error,
    }
    dispatch(searchMovieFetchingError(errorPayload))
  }
}
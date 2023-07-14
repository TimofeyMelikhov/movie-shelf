import axios from '../../axios/index';
import { AppDispatch } from '../index';
import { IMovieDetail, ISequelPrequel, IStaff } from '../../models/IMovieModels'
import { moviesDetailFetchingError, moviesDetailFetchingSuccess, IMovieDetailPayload, movieStaffFetchingSuccess, IBudgetPayload, movieBudgetFetchingSuccess, IDistributionPayload, movieDistributionFetchingSuccess, moviePrequelFetchingSuccess } from '../slices/movieDetailSlice';

export const fetchDetailsMovie = (id: string | undefined) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get<IMovieDetail>(`v2.2/films/${id}`, 
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

export const fetchStaffMovie = (id: string | undefined) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get<IStaff>('v1/staff', 
      {
        headers: {
          'X-API-KEY': '03b257a3-99b3-43ff-be90-2f7b5b72e260',
          'Content-Type': 'application/json',
        },
        params: {
          filmId: id
        }
      }
    )
    dispatch(movieStaffFetchingSuccess(response.data))
  } catch (error) {
    const errorPayload: IMovieDetailPayload = {
      isLoading: false,
      error: error as Error,
    }
    dispatch(moviesDetailFetchingError(errorPayload))
  }
}

export const fetchBudgetMovie = (id: string | undefined) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get<IBudgetPayload>(`/v2.2/films/${id}/box_office`, 
      {
        headers: {
          'X-API-KEY': '03b257a3-99b3-43ff-be90-2f7b5b72e260',
          'Content-Type': 'application/json',
        }
      }
    )
    dispatch(movieBudgetFetchingSuccess(response.data))
  } catch (error) {
    const errorPayload: IMovieDetailPayload = {
      isLoading: false,
      error: error as Error,
    }
    dispatch(moviesDetailFetchingError(errorPayload))
  }
}

export const fetchDistributionMovie = (id: string | undefined) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get<IDistributionPayload>(`/v2.2/films/${id}/distributions`,
      {
        headers: {
          'X-API-KEY': '03b257a3-99b3-43ff-be90-2f7b5b72e260',
          'Content-Type': 'application/json',
        }
      }
    )
    dispatch(movieDistributionFetchingSuccess(response.data))
  } catch (error) {
    const errorPayload: IMovieDetailPayload = {
      isLoading: false,
      error: error as Error,
    }
    dispatch(moviesDetailFetchingError(errorPayload))
  }
}

export const fetchPrequelMovies = (id: string | undefined, setHasSequelsAndPrequels: Function) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get<ISequelPrequel>(`v2.1/films/${id}/sequels_and_prequels`,
      {
        headers: {
          'X-API-KEY': '03b257a3-99b3-43ff-be90-2f7b5b72e260',
          'Content-Type': 'application/json',
        }
      }
    )
    dispatch(moviePrequelFetchingSuccess(response.data))
    setHasSequelsAndPrequels(true)
  } catch (error) {
    const errorPayload: IMovieDetailPayload = {
      isLoading: false,
      error: error as Error,
    }
    dispatch(moviesDetailFetchingError(errorPayload))
  }
}
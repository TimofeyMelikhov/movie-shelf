import axios from 'axios';
import { AppDispatch } from './index';
import { moviesFetching, moviesFetchingSuccess, moviesFetchingError } from './slices/moviesReducer'
// import { IMovie } from '../models/IMovie';
import { IPayloadAction } from './slices/moviesReducer'
import { IUser, setAuth, setError, setLoading, setUser } from './slices/userSlice';

export const fetchMovies = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(moviesFetching())
    const response = await axios.get<IPayloadAction>('https://kinopoiskapiunofficial.tech/api/v2.2/films', 
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

export const loginUser = (username: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading())
    setTimeout(async () => {
      const response = await axios.get<IUser[]>('./users.json')
      const mockUser = response.data.find(user => user.username === username && user.password === password)
      if(mockUser) {
        localStorage.setItem('auth', 'true')
        localStorage.setItem('username', mockUser.username)
        dispatch(setAuth(true))
        dispatch(setUser(mockUser))
      } else {
        dispatch(setError('Неверный логин или пароль'))
      }
    }, 1000)
  } catch (e) {
    dispatch(setError(e))

  }
}

export const logoutUser = () => async (dispatch: AppDispatch) => {
  localStorage.removeItem('auth')
  localStorage.removeItem('username')
  dispatch(setUser({} as IUser))
  dispatch(setAuth(false))
}
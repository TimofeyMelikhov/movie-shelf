import axios from 'axios';
import { AppDispatch } from '../index';
import { IUser, setAuth, setError, setLoading, setUser } from '../slices/userSlice';

export const loginUser = (username: string, password: string, navigate: Function) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get<IUser[]>('./users.json');
    const mockUser = response.data.find(
      (user) => user.username === username && user.password === password
    );
    if (mockUser) {
      localStorage.setItem('auth', 'true');
      localStorage.setItem('username', mockUser.username);
      dispatch(setAuth(true));
      dispatch(setUser(mockUser));
      setTimeout(() => {
        navigate('/');
        dispatch(setLoading(false));
      }, 1000);
    } else {
      setTimeout(() => {
        dispatch(setError('Неверный логин или пароль'));
        dispatch(setLoading(false));
      }, 1000);
    }
  } catch (e) {
    dispatch(setError(e));
    dispatch(setLoading(false));
  }
}

export const logoutUser = () => async (dispatch: AppDispatch) => {
  localStorage.removeItem('auth')
  localStorage.removeItem('username')
  dispatch(setUser({} as IUser))
  dispatch(setAuth(false))
}
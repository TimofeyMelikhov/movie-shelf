import axios from 'axios';
import { AppDispatch } from './index';
import { IUser } from '../models/IUser';
export const fetchUsers = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users')
  } catch (error) {
    console.log(error)
  }
}
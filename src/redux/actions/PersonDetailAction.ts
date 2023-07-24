import axios from '../../axios/index';
import { AppDispatch } from '../index';
import { IPersonDetail } from '../../models/IMovieModels'
import { personDetailFetchingError, personDetailFetchingSuccess, IPersonDetailPayload } from '../slices/personDetailSlice';

export const fetchDetailsPerson = (id: string | undefined) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get<IPersonDetail>(`/v1/staff/${id}`, 
        {
          headers: {
            'X-API-KEY': '03b257a3-99b3-43ff-be90-2f7b5b72e260',
            'Content-Type': 'application/json',
          }
        }
      )
      dispatch(personDetailFetchingSuccess(response.data))
  } catch (error) {
    const errorPayload: IPersonDetailPayload = {
      isLoading: false,
      error: error as Error,
    }
    dispatch(personDetailFetchingError(errorPayload))
  }
}
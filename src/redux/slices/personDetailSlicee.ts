import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IPersonDetail } from "../../models/IMovieModels"

interface IPersonDetailState {
  personDetail: IPersonDetail | null
  isLoading: boolean
  isError: string
}

export interface IPersonDetailPayload {
  isLoading: boolean;
  error: Error;
}

const initialState: IPersonDetailState = {
  personDetail: null,
  isLoading: false,
  isError: ''
}

export const personDetailSlice = createSlice({
  name: 'personDetail',
  initialState,
  reducers: {
    personDetailFetching(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    personDetailFetchingSuccess(state, action) {
      state.isLoading = false
      state.isError = ''
      state.personDetail = action.payload
    },
    personDetailFetchingError(state, action: PayloadAction<IPersonDetailPayload>) {
      state.isLoading = action.payload.isLoading
      state.isError = action.payload.error.message
    }
  }
})

export default personDetailSlice.reducer
export const { personDetailFetching, personDetailFetchingSuccess, personDetailFetchingError } = personDetailSlice.actions
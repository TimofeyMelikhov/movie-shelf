import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IMovieDetail } from '../../models/IMovieModels' 

interface IMovieDetailState {
  detailMovie: IMovieDetail | null
  isLoading: boolean
  isError: string,
}

export interface IMovieDetailPayload {
  isLoading: boolean;
  error: Error;
}


const initialState: IMovieDetailState = {
  detailMovie: null,
  isLoading: false,
  isError: ''
}

export const movieDetailSlice = createSlice({
  name: 'movieDetail',
  initialState,
  reducers: {
    movieDetailFetching(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    moviesDetailFetchingSuccess(state, action) {
      state.isLoading = false
      state.isError = ''
      state.detailMovie = action.payload
    },
    moviesDetailFetchingError(state, action: PayloadAction<IMovieDetailPayload>) {
      state.isLoading = action.payload.isLoading
      state.isError = action.payload.error.message
    }
  }
})

export default movieDetailSlice.reducer
export const { movieDetailFetching, moviesDetailFetchingSuccess, moviesDetailFetchingError } = movieDetailSlice.actions
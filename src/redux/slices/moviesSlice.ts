import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IMovie } from "../../models/IMovieModels"

interface IMoviesState {
  movies: IMovie[]
  isLoading: boolean
  isError: string,
}

export interface IPayloadAction {
  items: IMovie[]
}

const initialState: IMoviesState = {
  movies: [],
  isLoading: false,
  isError: ''
}

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    moviesFetching(state) {
      state.isLoading = true
    },
    moviesFetchingSuccess(state, action: PayloadAction<IPayloadAction>) {
      state.isLoading = false
      state.isError = ''
      state.movies = action.payload.items
    },
    moviesFetchingError(state, action: PayloadAction<Error>) {
      state.isLoading = false
      state.isError = action.payload.message
    }
  }
})

export default movieSlice.reducer
export const {moviesFetching, moviesFetchingSuccess, moviesFetchingError} = movieSlice.actions
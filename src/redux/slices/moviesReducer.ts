import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IMovie } from "../../models/IMovie"

interface IMoviesState {
  movies: IMovie[]
  isLoading: boolean
  isError: string,
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
    moviesFetchingSuccess(state, action: PayloadAction<IMovie[]>) {
      state.isLoading = false
      state.isError = ''
      state.movies = action.payload
    },
    moviesFetchingError(state, action: PayloadAction<Error>) {
      state.isLoading = false
      state.isError = action.payload.message
    }
  }
})

export default movieSlice.reducer
export const {moviesFetching, moviesFetchingSuccess, moviesFetchingError} = movieSlice.actions
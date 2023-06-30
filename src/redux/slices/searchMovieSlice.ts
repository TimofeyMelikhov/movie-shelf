import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { ISearchMovie } from "../../models/IMovieModels"

interface ISearchMovies {
  films: ISearchMovie[]
  isLoading: boolean
  isError: string
  pagesCount: number
  searchFilmsCountResult: number
}

export interface IPayloadAction {
  films: ISearchMovie[],
  pagesCount: number,
  searchFilmsCountResult: number
}

export interface ISearchMovieErrorPayload {
  isLoading: boolean;
  error: Error;
}

const initialState: ISearchMovies = {
  films: [],
  pagesCount: 0,
  searchFilmsCountResult: 0,
  isLoading: false,
  isError: ''
}

export const searchMovieSlice = createSlice({
  name: 'searchMovie',
  initialState,
  reducers: {
    searchFetching(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    searchMovieFetchingSuccess(state, action: PayloadAction<IPayloadAction>) {
      state.isLoading = false
      state.isError = ''
      state.films = action.payload.films
    },
    searchMovieFetchingError(state, action: PayloadAction<ISearchMovieErrorPayload>) {
      state.isLoading = action.payload.isLoading
      state.isError = action.payload.error.message
    }
  }
})
export default searchMovieSlice.reducer
export const { searchFetching, searchMovieFetchingSuccess, searchMovieFetchingError } = searchMovieSlice.actions
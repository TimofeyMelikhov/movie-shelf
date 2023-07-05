import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { ISearchMovie, ISearchPerson } from "../../models/IMovieModels"

interface ISearchMovies {
  films: ISearchMovie[]
  items: ISearchPerson[]
  isLoading: boolean
  isError: string
  pagesCount: number
  searchFilmsCountResult: number
}

export interface IMoviePayloadAction {
  films: ISearchMovie[],
  isLoading: boolean;
}
export interface IPersonPayloadAction {
  items: ISearchPerson[]
  isLoading: boolean;
}

export interface ISearchMovieErrorPayload {
  isLoading: boolean;
  error: Error;
}

const initialState: ISearchMovies = {
  films: [],
  items: [],
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
    searchMovieFetchingSuccess(state, action: PayloadAction<IMoviePayloadAction>) {
      state.isLoading = action.payload.isLoading
      state.isError = ''
      state.films = action.payload.films
    },
    searchPersonFetchingSuccess(state, action: PayloadAction<IPersonPayloadAction>) {
      state.isLoading = action.payload.isLoading
      state.isError = ''
      state.items = action.payload.items
    },
    searchMovieFetchingError(state, action: PayloadAction<ISearchMovieErrorPayload>) {
      state.isLoading = action.payload.isLoading
      state.isError = action.payload.error.message
    }
  }
})
export default searchMovieSlice.reducer
export const { searchFetching, searchMovieFetchingSuccess, searchMovieFetchingError, searchPersonFetchingSuccess } = searchMovieSlice.actions
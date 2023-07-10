import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IBudget, IDistribution, IMovieDetail, IStaff } from '../../models/IMovieModels' 

interface IMovieDetailState {
  detailMovie: IMovieDetail | null
  staff: IStaff[] | null
  budget: IBudget[] | null
  distribution: IDistribution[] | null
  isLoading: boolean
  isError: string,
}

export interface IMovieDetailPayload {
  isLoading: boolean;
  error: Error;
}

export interface IBudgetPayload {
  items: IBudget[]
}

export interface IDistributionPayload {
  items: IDistribution[]
}

const initialState: IMovieDetailState = {
  detailMovie: null,
  staff: null,
  budget: null,
  distribution: null,
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
    movieStaffFetchingSuccess(state, action) {
      state.isLoading = false
      state.isError = ''
      state.staff = action.payload
    },
    movieBudgetFetchingSuccess (state, action: PayloadAction<IBudgetPayload>) {
      state.isLoading = false
      state.isError = ''
      state.budget = action.payload.items
    },
    movieDistributionFetchingSuccess (state, action: PayloadAction<IDistributionPayload>) {
      state.isLoading = false
      state.isError = ''
      state.distribution = action.payload.items
    },
    moviesDetailFetchingError(state, action: PayloadAction<IMovieDetailPayload>) {
      state.isLoading = action.payload.isLoading
      state.isError = action.payload.error.message
    }
  }
})

export default movieDetailSlice.reducer
export const { 
  movieDetailFetching, 
  moviesDetailFetchingSuccess, 
  moviesDetailFetchingError, 
  movieStaffFetchingSuccess, 
  movieBudgetFetchingSuccess, 
  movieDistributionFetchingSuccess 
} = movieDetailSlice.actions
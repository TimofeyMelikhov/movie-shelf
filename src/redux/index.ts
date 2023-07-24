import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/userSlice'
import movieDetailReducer from './slices/movieDetailSlice'
import searchMovieReducer from './slices/searchMovieSlice'
import personDetailReducer from './slices/personDetailSlice'
import { movieApi } from './movies.api'

const rootReducer = combineReducers({
  authReducer,
  movieDetailReducer,
  searchMovieReducer,
  personDetailReducer,
  [movieApi.reducerPath]: movieApi.reducer
})

export const setupStore = () =>{
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(movieApi.middleware)
  })
} 

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
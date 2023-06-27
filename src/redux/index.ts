import { combineReducers, configureStore } from '@reduxjs/toolkit'
import moviesReducer from './slices/moviesSlice'
import authReducer from './slices/userSlice'
import movieDetailReducer from './slices/movieDetailSlice'

const rootReducer = combineReducers({
  moviesReducer,
  authReducer,
  movieDetailReducer
})

export const setupStore = () =>{
  return configureStore({
    reducer: rootReducer
  })
} 

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
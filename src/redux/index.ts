import { combineReducers, configureStore } from '@reduxjs/toolkit'
import moviesReducer from './slices/moviesReducer'
import authReducer from './slices/userSlice'

const rootReducer = combineReducers({
  moviesReducer,
  authReducer
})

export const setupStore = () =>{
  return configureStore({
    reducer: rootReducer
  })
} 

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
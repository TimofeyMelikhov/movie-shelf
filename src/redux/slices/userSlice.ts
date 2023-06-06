import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface IAuth {
  isAuth: boolean
  user: IUser
  isLoading: boolean
  isError: string
}

export interface IUser {
  username: string
  password: string
}

const initialState: IAuth = {
  isAuth: false,
  isError: '',
  isLoading: false,
  user: {} as IUser
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload
      state.isLoading = action.payload
    },
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload
    },
    setError(state, action) {
      state.isError = action.payload
    }
  }
})

export default authSlice.reducer
export const {setLoading, setAuth, setUser, setError} = authSlice.actions
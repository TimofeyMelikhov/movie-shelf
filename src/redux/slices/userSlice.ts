import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface IAuth {
  isAuth: boolean
}

const initialState: IAuth = {
  isAuth: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload
    }
  }
})

export default authSlice.reducer
export const {setAuth} = authSlice.actions
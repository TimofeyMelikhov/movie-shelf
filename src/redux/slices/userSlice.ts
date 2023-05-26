import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IUser } from "../../models/IUser"

interface IUserState {
  users: IUser[]
  isLoading: boolean
  isError: string,
}

const initialState: IUserState = {
  users: [],
  isLoading: false,
  isError: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    usersFetching(state) {
      state.isLoading = true
    },
    usersFetchingSuccess(state, action: PayloadAction<IUser[]>) {
      state.isLoading = false
      state.isError = ''
      state.users = action.payload
    },
    usersFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.isError = action.payload
    }
  }
})

export default userSlice.reducer
export const {} = userSlice.actions
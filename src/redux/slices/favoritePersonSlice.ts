import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IPersonDetail } from "../../models/IMovieModels"

// interface IFavoritePerson {
//   favoritePerson: IPersonDetail
// }

const initialState = {
  favoritePerson: []
}

export const favoritePerson = createSlice({
  name: 'favoritePerson',
  initialState,
  reducers: {
    addToFavoritePerson(state, action: PayloadAction<IPersonDetail>) {
      // state.favoritePerson.isLiked = true
    }
  }
})

export default favoritePerson.reducer
export const { addToFavoritePerson } = favoritePerson.actions
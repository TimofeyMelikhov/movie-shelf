import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IPersonDetail } from '../../models/IMovieModels'

const initialState: IPersonDetail[] = []

export const favoritePerson = createSlice({
	name: 'favoritePerson',
	initialState,
	reducers: {
		addToFavoritePerson(state, action: PayloadAction<IPersonDetail>) {
			state.push(action.payload)
		},
		removeFromFavorites(state, action: PayloadAction<Number>) {
			return state.filter(actor => actor.personId !== action.payload)
		},
		updatedUserInfo(state, action: PayloadAction<IPersonDetail>) {
			const userIndex = state.findIndex(
				user => user.personId === action.payload.personId
			)

			if (userIndex !== -1) {
				state[userIndex] = action.payload
			}
		}
	}
})

export default favoritePerson.reducer
export const { addToFavoritePerson, removeFromFavorites, updatedUserInfo } =
	favoritePerson.actions

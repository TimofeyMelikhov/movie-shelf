import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Layout } from './components/layout/Layout'

import { RequireAuth } from './hoc/RequireAuth'
import { MainPage } from './pages/MainPage/Main'
import { MovieDetails } from './pages/MovieDetailPage/MovieDetails'
import { Series } from './pages/filmFromCollections/ListsOfCollections'
import { ListCollection } from './pages/filmFromCollections/listCollection/ListCollection'
import { Login } from './pages/loginPage/Login'
import Movie from './pages/moviePage/Movie'
import { NotfoundPage } from './pages/notfound/NotfoundPage'
import { PersonDetails } from './pages/personDetailPage/PersonDetails'
import { ProfilePage } from './pages/profilePage/ProfilePage'
import { RouteNames } from './router/routeModel'

const App: React.FC = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route
						index
						element={
							<RequireAuth>
								<MainPage />
							</RequireAuth>
						}
					/>
					<Route path={RouteNames.LOGIN} element={<Login />} />
					<Route
						path={RouteNames.SEARCH}
						element={
							<RequireAuth>
								<Movie />
							</RequireAuth>
						}
					/>
					<Route
						path={RouteNames.COLLECTIONS}
						element={
							<RequireAuth>
								<Series />
							</RequireAuth>
						}
					/>
					<Route
						path={RouteNames.DETAILS}
						element={
							<RequireAuth>
								<MovieDetails />
							</RequireAuth>
						}
					/>
					<Route
						path={RouteNames.PERSON_DETAIL}
						element={
							<RequireAuth>
								<PersonDetails />
							</RequireAuth>
						}
					/>
					<Route
						path={RouteNames.PROFILE}
						element={
							<RequireAuth>
								<ProfilePage />
							</RequireAuth>
						}
					/>
					<Route
						path={RouteNames.COLLECTION}
						element={
							<RequireAuth>
								<ListCollection />
							</RequireAuth>
						}
					/>
					<Route path='*' element={<NotfoundPage />} />
				</Route>
			</Routes>
		</>
	)
}

export default App

import { Login } from '../pages/loginPage/Login'
import { MainPage } from '../pages/MainPage/Main'
import { MovieDetails } from '../pages/MovieDetailPage/MovieDetails'

import { IRoute, RouteNames } from './routeModel'

export const publicRoutes: IRoute[] = [
  {
    path: RouteNames.LOGIN,
    component: Login
  }
]

export const privateRoutes: IRoute[] = [
  {
    path: RouteNames.MAIN,
    component: MainPage
  },
  {
    path: RouteNames.DETAILS,
    component: MovieDetails
  }
]
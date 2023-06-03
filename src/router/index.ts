import { Login } from '../pages/Login'
import { MainPage } from '../pages/MainPage'
import { MovieDetails } from '../pages/MovieDetails'

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
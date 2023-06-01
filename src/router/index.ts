import { Login } from '../pages/Login'
import { MainPage } from '../pages/MainPage'
import { IRoute, RouteNames } from './routeModel'

export const publicRoutes: IRoute[] = [
  {
    path: RouteNames.LOGIN,
    exact: true,
    component: Login
  }
]

export const privateRoutes: IRoute[] = [
  {
    path: RouteNames.MAIN,
    exact: true,
    component: MainPage
  }
]
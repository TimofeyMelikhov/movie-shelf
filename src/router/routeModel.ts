import React from 'react' 

export interface IRoute {
  path: string
  component: React.ComponentType
}

export enum RouteNames {
  LOGIN = '/login',
  MAIN = '/',
  DETAILS = '/film/:id'
}
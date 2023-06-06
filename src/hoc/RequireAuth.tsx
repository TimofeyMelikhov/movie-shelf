import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import { RouteNames } from '../router/routeModel';

interface IAuthProps {
  children: React.ReactElement
}

export const RequireAuth = ({children}: IAuthProps) => {

const location = useLocation()

const {isAuth} = useAppSelector(state => state.authReducer)

if(!isAuth) {
  return <Navigate to={RouteNames.LOGIN} state={{from: location}} />
}

  return children
}
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { RouteNames } from '../router/routeModel';
import { setAuth, setUser } from '../redux/slices/userSlice';

interface IAuthProps {
  children: React.ReactElement;
}

export const RequireAuth = ({ children }: IAuthProps) => {
  const location = useLocation();
  const { isAuth } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedAuth = localStorage.getItem('auth');
    const savedUsername = localStorage.getItem('username');

    if (savedAuth && savedUsername) {
      dispatch(setAuth(true));
      dispatch(setUser({ username: savedUsername, password: '' }));
    }

    setIsLoading(false);
  }, [dispatch]);

  if (isLoading) {
    return null;
  }

  if (!isAuth) {
    return (
      <Navigate
        to={RouteNames.LOGIN}
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
};

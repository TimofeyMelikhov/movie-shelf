import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import { privateRoutes, publicRoutes } from './router/index';
import { Navigation } from './components/Navigation'
import { useAppSelector } from './hooks/redux';


const App = () => {

  const {isAuth} = useAppSelector(state => state.authReducer)
  
  // const authFromStorage = localStorage.getItem('auth')

  return (  
    <> 
      <Navigation /> 
 
      <Routes>  
        {isAuth ?  
          privateRoutes.map(route => <Route key={route.path} path={route.path} element={<route.component />} />)  
          :
          publicRoutes.map(route => <Route key={route.path} path={route.path} element={<route.component />} />)
        }
      </Routes>  
    </> 
  )  
  
}

export default App;

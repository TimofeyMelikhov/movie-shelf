import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import { privateRoutes, publicRoutes } from './router/index';
import { Navigation } from './components/Navigation'


const App = () => {

  const auth = true

  return ( 
    <>
      <Navigation />
      <Routes> 
        {auth ? 
          privateRoutes.map(route => <Route key={route.path} path={route.path} element={<route.component />} />) 
          : 
          publicRoutes.map(route => <Route key={route.path} path={route.path} element={<route.component />} />)
        } 
      </Routes> 
    </>
  ) 
  
}

export default App;

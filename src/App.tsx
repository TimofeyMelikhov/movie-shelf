import React from 'react';
import { Routes, Route} from 'react-router-dom'
import { privateRoutes, publicRoutes } from './router/index';
import { Navigation } from './components/navbar/Navigation'
import { useAppSelector } from './hooks/redux';

const App: React.FC = () => {

  const {isAuth} = useAppSelector(state => state.authReducer)

  return (  
    <> 
      <Navigation /> 

      { !isAuth ?
          <div style={{textAlign: 'center'}}>
          <h1>Добро пожаловать!</h1>
          <p>Здесь вы можете найти информацию о различных фильмах имеющихся в базе Кинопоиска.</p>
          <p>Чтобы получить более подробную информацию о фильме и воспользоваться другими функциями сайта, пожалуйста, авторизуйтесь</p>
        </div>
        :
        null
      }
 
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

import React from 'react';
import { Routes, Route} from 'react-router-dom'
import { RouteNames } from './router/routeModel';
import { MainPage } from './pages/MainPage/Main';
import { Login } from './pages/loginPage/Login';
import { MovieDetails } from './pages/MovieDetailPage/MovieDetails';
import { NotfoundPage } from './pages/notfound/NotfoundPage';
import { RequireAuth } from './hoc/RequireAuth';
import { Layout } from './components/layout/Layout';

const App: React.FC = () => {

  return (  
    <>  
      <Routes>  
        <Route path='/' element={ <Layout /> }>
          <Route index element={ 
              <RequireAuth> 
                <MainPage/> 
              </RequireAuth> 
            } 
          />
          <Route path={RouteNames.LOGIN} element={ <Login/> } />
          <Route path={RouteNames.DETAILS} element={ <MovieDetails/> } />
          <Route path='*' element={ <NotfoundPage/> } />
        </Route>  
      </Routes>
    </> 
  )
}

export default App;

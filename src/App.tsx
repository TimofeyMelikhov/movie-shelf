import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { RouteNames } from './router/routeModel';
import { MainPage } from './pages/MainPage/Main';
import { Login } from './pages/loginPage/Login';
import { MovieDetails } from './pages/MovieDetailPage/MovieDetails';
import { PersonDetails } from './pages/personDetailPage/PersonDetails';
import { NotfoundPage } from './pages/notfound/NotfoundPage';
import { RequireAuth } from './hoc/RequireAuth';
import { Layout } from './components/layout/Layout';
import Movie from './pages/moviePage/Movie';
import Series from './pages/series/Series';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <RequireAuth>
                <MainPage />
              </RequireAuth>
            }
          />
          <Route path={RouteNames.LOGIN} element={<Login />} />
          <Route path={RouteNames.FILM} element={<RequireAuth><Movie /></RequireAuth>} />
          <Route path={RouteNames.SERIES} element={<RequireAuth><Series /></RequireAuth>} />
          <Route path={RouteNames.DETAILS} element={<RequireAuth><MovieDetails /></RequireAuth>} />
          <Route path={RouteNames.PERSON_DETAIL} element={<RequireAuth><PersonDetails /></RequireAuth>} />
          <Route path="*" element={<NotfoundPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;

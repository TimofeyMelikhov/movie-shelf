import React from 'react'
import { Link } from 'react-router-dom'
import classes from './navigation.module.css'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { logoutUser } from '../../redux/actions/LoginAction'
import { MovieSearch } from '../movieSearch/MovieSearch'

export const Navigation: React.FC = () => {

  const {isAuth, user} = useAppSelector(state => state.authReducer) 

  const dispatch = useAppDispatch()

  const logout = () => {
    dispatch(logoutUser())
  }

  return (
    <nav>

      { isAuth ? 
        <div className={classes.navBar}>
          <Link to='/'>Кинополка</Link>
          <MovieSearch />
          <div className="flex items-center">
            <div style={{ color: 'white', fontWeight: 700, marginRight: '25px' }}> {user.username} </div>
            <Link to='/login' onClick={logout}> Выйти </Link>
          </div>
        </div>
        :
          <div className={classes.navBar}>
            <Link to='/'>Кинополка</Link>
          </div>
      }

    </nav>
  )
}

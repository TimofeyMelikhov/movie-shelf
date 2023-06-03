import React from 'react'
import { Link } from 'react-router-dom'
import classes from './navigation.module.css'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { logoutUser } from '../redux/ActionCreators'

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
            <Link to='/'>Главная</Link>
            <div style={{color: 'white', fontWeight: 700}}>{user.username}</div>
            <Link to='/login' onClick={logout}>Выйти</Link>
          </div>
        :
          <div className={classes.navBar}>
            <Link to='/'>Главная</Link>
          </div>
      }

    </nav>
  )
}

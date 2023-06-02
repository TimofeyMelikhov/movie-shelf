import React from 'react'
import { Link } from 'react-router-dom'
import classes from './navigation.module.css'
import { useAppSelector } from '../hooks/redux'

export const Navigation: React.FC = () => {

  const {isAuth} = useAppSelector(state => state.authReducer) 

  return (
    <nav>

      { isAuth ? 
          <div className={classes.navBar}>
            <Link to='/'>Главная</Link>
            <div style={{color: 'white', fontWeight: 700}}>Shibatuch</div>
            <Link to='/login'>Выйти</Link>
          </div>
        :
          <div className={classes.navBar}>
            <Link to='/'>Главная</Link>
          </div>
      }

    </nav>
  )
}

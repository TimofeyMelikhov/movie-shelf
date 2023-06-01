import React from 'react'
import { Link } from 'react-router-dom'
import classes from './navigation.module.css'

export const Navigation: React.FC = () => {

  return (
    <nav className={classes.navBar}>
      <Link to='/'>Movies</Link>
      <Link to='/login'>Login</Link>
    </nav>
  )
}

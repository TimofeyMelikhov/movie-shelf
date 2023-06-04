import React from 'react'
import classes from './login.module.css'
import { LoginForm } from '../../components/form/LoginForm'

export const Login: React.FC = () => {
  
  return (
    <div className={classes.container}>
      <LoginForm />
    </div>
  )
}

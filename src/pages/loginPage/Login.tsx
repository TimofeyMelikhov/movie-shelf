import React from 'react'
import classes from './login.module.css'
import { LoginForm } from '../../components/form/LoginForm'

export const Login: React.FC = () => {
  
  return (
    <div className={classes.container}>
      <div className='text-center text-[16px]'>
        <h1>Добро пожаловать!</h1>
        <p>Здесь вы можете найти информацию о различных фильмах, сериалах и актерах имеющихся в базе Кинопоиска.</p>
        <p>Чтобы получить более подробную информацию о них и воспользоваться другими функциями сайта, пожалуйста, авторизуйтесь</p>
      </div>
      <LoginForm />
    </div>
  )
}

import React, {useState} from 'react'
import classes from './loginForm.module.css'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { loginUser } from '../../redux/actions/LoginAction'

export const LoginForm: React.FC = () => {

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const { isError } = useAppSelector(state => state.authReducer)

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault()
    dispatch(loginUser(username, password))
    navigate('/')
  }

  return (
    <div className={classes.wrapper}>
      <h3 className={classes.header}>Авторизация</h3>
      <form
        onSubmit={submitHandler}
      >
        <input 
          className='block p-4'
          type="text" 
          value={username} 
          onChange={e => setUsername(e.currentTarget.value)} 
          placeholder='Введите логин' 
        />

        <input 
          className='block p-4'
          type="password" 
          value={password} 
          onChange={e => setPassword(e.currentTarget.value)} 
          placeholder='Введите пароль' 
        />
        <button 
          className={classes.button}
        >Войти</button>
      </form>
      {isError && <div style={{color: 'red'}}> {isError} </div>}
    </div>
  )
}

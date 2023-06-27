import React, {useState, KeyboardEvent, ChangeEvent } from 'react'
import classes from './loginForm.module.css'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { loginUser } from '../../redux/actions/LoginAction'
import { setError } from '../../redux/slices/userSlice'

export const LoginForm: React.FC = () => {

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errorName, setErrorName] = useState<boolean | null>(null)
  const [errorPass, setErrorPass] = useState<boolean | null>(null)
  
  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const { isError, isAuth, isLoading } = useAppSelector(state => state.authReducer)

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault()
    setErrorName(username === '');
    setErrorPass(password === '');
    if (username !== '' && password !== '') {
      dispatch(loginUser(username, password, navigate));
      dispatch(setError(''))
    }
  }

  const onChangeUsernameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value)
    setErrorName(false)
  }
  const onChangePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value)
    setErrorPass(false)
  }

  const oneKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submitHandler(e)
    }
  }

  return (
    <div className={classes.content}>
      { !isAuth && 
        <div className='text-center text-[16px]'>
          <h1>Добро пожаловать!</h1>
          <p>Здесь вы можете найти информацию о различных фильмах имеющихся в базе Кинопоиска.</p>
          <p>Чтобы получить более подробную информацию о фильме и воспользоваться другими функциями сайта, пожалуйста, авторизуйтесь</p>
        </div>
      }

      <div className={classes.wrapper}>
        <h3 className={classes.header}>Авторизация</h3>
        <form
          onSubmit={submitHandler}
        >
          <input 
            className={classes.input_login}
            type="text" 
            value={username} 
            onChange={onChangeUsernameHandler}
            onKeyDown={oneKeyPressHandler}
            placeholder='Введите логин' 
          />
          { errorName && <div className={classes.error_message}>Введите логин</div> }

          <input 
            className={classes.input_login}
            type="password" 
            value={password} 
            onChange={onChangePasswordHandler}
            onKeyDown={oneKeyPressHandler}
            placeholder='Введите пароль' 
          />
          { errorPass && <div className={classes.error_message}>Введите пароль</div> }
          <button 
            className={classes.button}
          > { isLoading ? 'Загрузка...' : 'Войти' } </button>
        </form>
        {isError && <div style={{color: 'red'}}> {isError} </div>}
      </div>
    </div>
  )
}

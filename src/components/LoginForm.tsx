import React, {useState} from 'react'
import { Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { loginUser } from '../redux/ActionCreators'

export const LoginForm: React.FC = () => {

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const dispatch = useAppDispatch()
  const { isError } = useAppSelector(state => state.authReducer)

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault()
    dispatch(loginUser(username, password))
    return <Navigate to='/' replace />
  }

  return (
    <div style={{textAlign: 'center'}}>
      Авторизация
      <form
        style={{padding: '5px'}}
        onSubmit={submitHandler}
      >
        <input 
          type="text" 
          value={username} 
          onChange={e => setUsername(e.currentTarget.value)} 
          style={{ margin: '5px' }} 
          placeholder='Введите логин' 
        />
        
        <input 
          type="password" 
          value={password} 
          onChange={e => setPassword(e.currentTarget.value)} 
          style={{ margin: '5px' }} 
          placeholder='Введите пароль' 
        />
        <button>Войти</button>
      </form>
      {isError && <div style={{color: 'red'}}> {isError} </div>}
    </div>
  )
}

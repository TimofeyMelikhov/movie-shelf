import React, {useState} from 'react'

export const LoginForm: React.FC = () => {

  const [login, setLogin] = useState<string>('')

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault()
  }

  return (
    <div style={{textAlign: 'center'}}>
      Авторизация
      <form
        style={{padding: '5px'}}
        onSubmit={submitHandler}
      >
        <input type="text" value={login} style={{ margin: '5px' }} placeholder='Введите логин' />
        <input type="password" style={{ margin: '5px' }} placeholder='Введите пароль' />
        <button>Войти</button>
      </form>
    </div>
  )
}

import React from 'react'

export const Login: React.FC = () => {

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault()
  }

  return (
  <form
    onSubmit={submitHandler}
  >

  </form>
  )
}

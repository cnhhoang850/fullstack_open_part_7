import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {login} from '../reducers/userReducer'
import {useDispatch} from 'react-redux'
import {useField} from '../index'

const Login = () => {
    const dispatch = useDispatch()
    const username = useField('username')
    const password = useField('password')

    const handleLogin = async (event) => {
        event.preventDefault()

        dispatch(login(username.value, password.value))

        username.reset()
        password.reset()
    }

    return (
    <div>
          <h2>Log in to the application</h2>
          <form onSubmit = {handleLogin}>
            <div>
              username
              <input 
                id="username"
                {...username}
                reset="placeholder"
              />
            </div>
            <div>
              password
                <input 
                  id="password"
                  {...password}
                  reset="placeholder"
                />
            </div>
            <button type = "submit" id="login-button">login</button>
          </form>
        </div>
  )}

export default Login
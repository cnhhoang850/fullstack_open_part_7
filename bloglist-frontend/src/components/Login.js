import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {login} from '../reducers/userReducer'
import {useDispatch} from 'react-redux'

const Login = () => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()

        dispatch(login(username, password))

        setUsername('')
        setPassword('')
    }

    return (
    <div>
          <h2>Log in to the application</h2>
          <form onSubmit = {handleLogin}>
            <div>
              username
              <input 
                id="username"
                type = "text"
                value = {username}
                name = "Username"
                onChange = {({target}) => {setUsername(target.value)}}
              />
            </div>
            <div>
              password
                <input 
                  id="password"
                  type = "password"
                  value = {password}
                  name = "Password"
                  onChange = {({target}) => setPassword(target.value)}
                />
            </div>
            <button type = "submit" id="login-button">login</button>
          </form>
        </div>
  )}

  Login.propTypes = {
    login: PropTypes.func.isRequired
  } 

export default Login
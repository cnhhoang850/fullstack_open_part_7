import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import blogService from './services/blogService'
import {initializeBlog} from './reducers/blogReducer'
import {BrowserRouter as Router} from 'react-router-dom'
import userService from './services/userService'
import { initializeProfile } from './reducers/profileReducer'
import {initializeUser} from './reducers/userReducer'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
      setValue(event.target.value)
  }

  const reset = () => [
      setValue('')
  ]

  return {
      type,
      value,
      onChange,
      reset
  }
}

store.dispatch(initializeUser())
store.dispatch(initializeProfile())
store.dispatch(initializeBlog())

ReactDOM.render(
    <Router>
    <Provider store={store}>
        <App />
    </Provider>
    </Router>, 
document.getElementById('root')
)
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import blogService from './services/blogService'
import {initializeBlog} from './reducers/blogReducer'


blogService.getAll().then(blogs => 
    store.dispatch(initializeBlog(blogs))
    )

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
document.getElementById('root')
)
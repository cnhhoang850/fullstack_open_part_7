import blogService from "../services/blogService"
import loginService from '../services/handleLogin'
import { newNoti } from "./notiReducer"

const userReducer = (state = null, action) => {
    switch(action.type) {
        case 'INIT':
            return action.data
        case 'LOGIN':
            return action.data
        case 'LOGOUT':
            return action.data
        default: 
            return state     
    }
}

export const login = (username, password) => {
    return async dispatch => {
        try {
            const user = await loginService.login({
                username, password
            })

            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            dispatch({
                type: 'LOGIN',
                data: user
            })
        } catch (exception) {
            dispatch(newNoti('something went wrong'))
        }
    }
}

export const logout = () => {
    return async dispatch => {
        window.localStorage.clear()
        dispatch(newNoti('logged out'))
        dispatch({
            type: 'LOGOUT',
            data: null
        })
    }
}

export const initializeUser = () => {
    return async dispatch => {
        const loggedUserJSON =  window.localStorage.getItem('loggedBlogappUser')
        console.log(loggedUserJSON)
        let user
        if (loggedUserJSON) {
            user = JSON.parse(loggedUserJSON)
            blogService.setToken(user.token)
        } else {
            user = null
        }
        dispatch({
            type:'INIT',
            data: user
        })
        
    }
}

export default userReducer
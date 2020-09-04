import userService from '../services/userService'
import {newNoti} from './notiReducer'

const profilesReducer = (state = [], action) => {
    switch(action.type) {
        case 'INIT_PRO':
            console.log(action.data)
            return action.data
        default:
            return state
    }
}

export const initializeProfile = (profiles) => {
    return async dispatch => {
        console.log(profiles)
        dispatch({
            type: 'INIT_PRO',
            data: profiles
        })
    }
}

export default profilesReducer
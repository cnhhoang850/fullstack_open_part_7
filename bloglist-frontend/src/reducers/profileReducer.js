import userService from '../services/userService'
const profilesReducer = (state = [], action) => {
    switch(action.type) {
        case 'INIT_PRO':
            return action.data
        default:
            return state
    }
}

export const initializeProfile = (profiles) => {
    return async dispatch => {
        const profiles = await userService.getAll()
        dispatch({
            type: 'INIT_PRO',
            data: profiles
        })
    }
}

export default profilesReducer
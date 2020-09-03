let timeoutID = false
const notiReducer = (state = '', action) => {
    switch(action.type) {
        case 'NEW_NOTI': {
            const message = action.data
            return `${message}`
        }
        case 'CLEAR_NOTI' : {
            timeoutID = false
            return ''
        }
        default: 
            return state
    }
}



export const newNoti = (message) => {
    return async dispatch => {
        await dispatch({
            type: 'NEW_NOTI',
            data: message
        })
        setTimeout(() => {
            dispatch(clearNoti())
        }, 5000)
    }
}


export const clearNoti = () => {
    return {
        type: 'CLEAR_NOTI'
    }
}

export default notiReducer
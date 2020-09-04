import { createStore, combineReducers, applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import notiReducer from './reducers/notiReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import profilesReducer from './reducers/profileReducer'

const reducer = combineReducers({
    profiles: profilesReducer,
    notification: notiReducer,
    blogs: blogReducer,
    user: userReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store 
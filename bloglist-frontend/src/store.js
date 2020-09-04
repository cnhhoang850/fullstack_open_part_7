import { createStore, combineReducers, applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import notiReducer from './reducers/notiReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import profilesReducer from './reducers/profileReducer'

const reducer = combineReducers({
    notification: notiReducer,
    blogs: blogReducer,
    user: userReducer,
    profiles: profilesReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store 
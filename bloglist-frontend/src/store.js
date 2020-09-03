import { createStore, combineReducers, applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import notiReducer from './reducers/notiReducer'
import blogReducer from './reducers/blogReducer'

const reducer = combineReducers({
    notification: notiReducer,
    blogs: blogReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store 
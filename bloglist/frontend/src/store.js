import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import loginReducer from './reducers/loginReducer'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogsReducer'

const reducer = combineReducers({
  login: loginReducer,
  notification: notificationReducer,
  blogs: blogReducer,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
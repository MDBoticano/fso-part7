// import loginService from '../services/login'
// import blogService from '../services/blogs'

const initialState = {
  username: '',
  name: '',
  userId: ''
}

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    data: user
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT'
  }
}

const loginReducer = (state = initialState, action) => {
  switch(action.type) {
  case 'SET_USER':
    return {
      ...state,
      username: action.data.username,
      name: action.data.name,
      userId: action.data.userId,
      token: action.data.token,
    }
  case 'LOGOUT':
    return initialState
  default:
    return state
  }
}

export default loginReducer
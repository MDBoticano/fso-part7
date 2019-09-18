const CREATE_NOTIFICATION = 'CREATE_NOTIFICATION'
const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION'

/* Action Creators */
const createNotification = (content) => {
  return {
    type: CREATE_NOTIFICATION,
    content,
  }
}

const removeNotification = () => {
  return {
    type: REMOVE_NOTIFICATION,
  }
}

/**
 * Allows components to create notifications
 * @param {Object} content - details about message to display
 * @param {Number} timeout - time in seconds to keep notification up
 *  default 5 seconds
 */
export const setNotification = (content, timeout = 5 ) => {
  /* thunk */
  return async (dispatch) => {
    const timeoutInMs = timeout * 1000

    /* Display the notification */
    dispatch(createNotification(content))

    /* Remove the notification and styling after a period of time */
    setTimeout(() => {
      dispatch(removeNotification())
    }, timeoutInMs)
  }
}

const initialState = {
  message: '',
  style: 'hidden'
}

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
  case CREATE_NOTIFICATION:
    return action.content
  case REMOVE_NOTIFICATION:
    return initialState
  default:
    return state
  }
}

export default notificationReducer
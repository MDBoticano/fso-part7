const CREATE_NOTIFICATION = 'CREATE_NOTIFICATION'
const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION'
let notifCount = 0

/* Action Creators */
/** @param {object} content - contains the message and style type to display */
const createNotification = (content) => {
  return {
    type: CREATE_NOTIFICATION,
    content,
  }
}

/** @param {Number} id - id count to identify overlaps during removal */
const removeNotification = (id) => {
  return {
    type: REMOVE_NOTIFICATION,
    id
  }
}

/**
 * Allows components to create notifications
 * @param {Object} content - details about message to display
 * @param {Number} timeout - time in seconds to keep notification up
 */
export const setNotification = (content, timeout = 5 ) => {
  /* Generate IDs for each notification to combat overlaps */
  notifCount = notifCount + 1
  const notifId = notifCount
  content.notifCount = notifId

  /* thunk */
  return async (dispatch) => {
    const timeoutInMs = timeout * 1000

    /* Display the notification */
    dispatch(createNotification(content))

    /* Remove the notification and styling after a period of time */
    setTimeout(() => {
      dispatch(removeNotification(notifId))
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
    if(action.id === notifCount) {
      return initialState
    } else {
      return state
    }
  default:
    return state
  }
}

export default notificationReducer
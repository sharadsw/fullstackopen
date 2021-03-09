const initialState = ''

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const setNotification = (msg, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: msg
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, time*1000)
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export default reducer
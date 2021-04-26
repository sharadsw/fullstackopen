let currentTimeout = null

const initialState = {
  alert: "",
  error: ""
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ALERT":
      return { ...state, alert: action.data }
    case "SET_ERROR":
      return { ...state, error: action.data }
    case "CLEAR_ALERT":
      return { ...state, alert: "" }
    case "CLEAR_ERROR":
      return { ...state, error: "" }
    default:
      return state
  }
}

export const clearNotification = () => {
  return {
    type: "CLEAR_NOTIFICATION"
  }
}

export const setNotification = (type, msg, time) => {
  return async dispatch => {
    dispatch({
      type: `SET_${type.toUpperCase()}`,
      data: msg
    })
    if (currentTimeout) {
      clearTimeout(currentTimeout)
    }
    currentTimeout = setTimeout(() => {
      dispatch({
        type: `CLEAR_${type.toUpperCase()}`
      })
    }, time*1000)
  }
}

export default reducer
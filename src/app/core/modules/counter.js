export const INCREMENT_REQUESTED = 'counter/INCREMENT_REQUESTED'
export const INCREMENT = 'counter/INCREMENT'
export const DECREMENT_REQUESTED = 'counter/DECREMENT_REQUESTED'
export const DECREMENT = 'counter/DECREMENT'

const initialState = {
  count: 0,
  isIncrementing: false,
  isDecrementing: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_REQUESTED:
      return {
        ...state,
        isIncrementing: true,
      }

    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
        isIncrementing: !state.isIncrementing,
      }

    case DECREMENT_REQUESTED:
      return {
        ...state,
        isDecrementing: true,
      }

    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
        isDecrementing: !state.isDecrementing,
      }

    default:
      return state
  }
}

export const increment = () => {
  const trigger = (dispatch) => {
    dispatch({
      type: INCREMENT_REQUESTED,
    })

    dispatch({
      type: INCREMENT,
    })
  }

  return trigger
}

export const incrementAsync = () => {
  const trigger = (dispatch) => {
    dispatch({
      type: INCREMENT_REQUESTED,
    })

    return setTimeout(() => {
      dispatch({
        type: INCREMENT,
      })
    }, 3000)
  }

  return trigger
}

export const decrement = () => {
  const trigger = (dispatch) => {
    dispatch({
      type: DECREMENT_REQUESTED,
    })

    dispatch({
      type: DECREMENT,
    })
  }

  return trigger
}

export const decrementAsync = () => {
  const trigger = (dispatch) => {
    dispatch({
      type: DECREMENT_REQUESTED,
    })

    return setTimeout(() => {
      dispatch({
        type: DECREMENT,
      })
    }, 3000)
  }

  return trigger
}

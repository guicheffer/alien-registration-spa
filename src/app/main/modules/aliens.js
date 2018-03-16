// export const INCREMENT_REQUESTED = 'aliens/INCREMENT_REQUESTED'
// export const INCREMENT = 'aliens/INCREMENT'
// export const DECREMENT_REQUESTED = 'aliens/DECREMENT_REQUESTED'
// export const DECREMENT = 'aliens/DECREMENT'
export const ADD_ALIEN = 'aliens/ADD_ALIEN'

const initialState = [
  {
    name: 'E.T.',
    species: ['anunnakis', 'greys'],
  },
  {
    name: 'Chewbacca',
    species: ['unknown'],
  },
  {
    name: 'Me',
    species: ['unknown'],
  },
]

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ALIEN: {
      const { name, species } = action.data.alien

      return [
        ...state,
        { name, species },
      ]
    }

    // case INCREMENT_REQUESTED:
    //   return {
    //     ...state,
    //     isIncrementing: true,
    //   }
    //
    // case INCREMENT:
    //   return {
    //     ...state,
    //     count: state.count + 1,
    //     isIncrementing: !state.isIncrementing,
    //   }
    //
    // case DECREMENT_REQUESTED:
    //   return {
    //     ...state,
    //     isDecrementing: true,
    //   }
    //
    // case DECREMENT:
    //   return {
    //     ...state,
    //     count: state.count - 1,
    //     isDecrementing: !state.isDecrementing,
    //   }

    default:
      return state
  }
}

export const addAlien = (alien) => {
  const trigger = (dispatch) => {
    // dispatch({
    //   type: NEW_ALIEN,
    // })

    dispatch({
      type: ADD_ALIEN,
      data: { alien },
    })
  }

  return trigger
}

// export const increment = () => {
//   const trigger = (dispatch) => {
//     dispatch({
//       type: INCREMENT_REQUESTED,
//     })
//
//     dispatch({
//       type: INCREMENT,
//     })
//   }
//
//   return trigger
// }
//
// export const incrementAsync = () => {
//   const trigger = (dispatch) => {
//     dispatch({
//       type: INCREMENT_REQUESTED,
//     })
//
//     return setTimeout(() => {
//       dispatch({
//         type: INCREMENT,
//       })
//     }, 3000)
//   }
//
//   return trigger
// }
//
// export const decrement = () => {
//   const trigger = (dispatch) => {
//     dispatch({
//       type: DECREMENT_REQUESTED,
//     })
//
//     dispatch({
//       type: DECREMENT,
//     })
//   }
//
//   return trigger
// }
//
// export const decrementAsync = () => {
//   const trigger = (dispatch) => {
//     dispatch({
//       type: DECREMENT_REQUESTED,
//     })
//
//     return setTimeout(() => {
//       dispatch({
//         type: DECREMENT,
//       })
//     }, 3000)
//   }
//
//   return trigger
// }

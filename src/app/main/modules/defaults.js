/*-
 * ⭐️ Our defaults and interaction states
 *
 *  This is where we can easily control the default values
 * and of course, our interaction states
 *
-*/

const initialState = {
  isDeleting: false,
  interacted: false,
  species: [
    {
      name: 'Anunnaki',
      slug: 'anunnakis',
    },
    {
      name: 'Grey',
      slug: 'greys',
    },
    {
      name: 'Unkown',
      slug: 'unknown',
    },
    {
      name: 'Nordic',
      slug: 'nordics',
    },
    {
      name: 'Reptilian',
      slug: 'reptilians',
    },
  ],
}

export const JUST_INTERACTED = 'defaults/JUST_INTERACTED'
export const DELETION_REQUESTED = 'defaults/DELETION_REQUESTED'

export default (state = initialState, action) => {
  switch (action.type) {
    case JUST_INTERACTED: {
      const { value = true } = action
      return { ...state, interacted: !!value }
    }

    case DELETION_REQUESTED: {
      const { id } = action
      return { ...state, isDeleting: id }
    }

    default:
      return state
  }
}

export const updateList = () => {
  const trigger = (dispatch) => {
    dispatch({
      type: JUST_INTERACTED,
      value: false,
    })
  }

  return trigger
}

export const requestDeletion = (id) => {
  const trigger = (dispatch) => {
    dispatch({
      type: DELETION_REQUESTED,
      id,
    })
  }

  return trigger
}

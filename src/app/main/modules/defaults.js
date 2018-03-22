export const JUST_INTERACTED = 'defaults/JUST_INTERACTED'

const initialState = {
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
      name: 'Nordic',
      slug: 'nordics',
    },
    {
      name: 'Reptilian',
      slug: 'reptilians',
    },
    {
      name: 'Unkown',
      slug: 'unknown',
    },
  ],
  interacted: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case JUST_INTERACTED: {
      const { value = true } = action
      return { ...state, interacted: !!value }
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

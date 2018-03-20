export const NEW_ALIEN = 'aliens/NEW_ALIEN'
export const ADD_ALIEN = 'aliens/ADD_ALIEN'
export const UPDATE_ALIEN_SPECIE = 'aliens/UPDATE_ALIEN_SPECIE'

const initialState = {
  list: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case NEW_ALIEN: {
      return {
        ...state,
        newAlienRequested: true,
      }
    }

    case ADD_ALIEN: {
      const { name, species } = action.data.alien
      const { list } = state

      return {
        ...state,
        list: [
          ...list,
          { name, species },
        ],
        newAlienRequested: false,
      }
    }

    case UPDATE_ALIEN_SPECIE: {
      const { alienKey, specieSlugId, value } = action

      const { list: rawList } = state
      const list = rawList.map((alien, key) => {
        /* eslint-disable no-param-reassign */
        if (key === alienKey) {
          const alienSpecies = alien.species || []

          if (value) alien.species = alienSpecies.concat(specieSlugId)
          else alien.species = alienSpecies.filter(specie => (specie !== specieSlugId))
        }
        /* eslint-enable no-param-reassign */

        return alien
      })

      return {
        ...state,
        list,
      }
    }

    default:
      return state
  }
}

export const addAlien = (alien) => {
  const trigger = (dispatch) => {
    dispatch({
      type: NEW_ALIEN,
    })

    dispatch({
      type: ADD_ALIEN,
      data: { alien },
    })
  }

  return trigger
}

export const updateAlienSpecie = (alienKey, specieSlugId, value) => {
  const trigger = (dispatch) => {
    dispatch({
      type: UPDATE_ALIEN_SPECIE,
      alienKey,
      specieSlugId,
      value,
    })
  }

  return trigger
}

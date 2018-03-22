import _ from 'lodash'

import generateUniqId from '../utils/generate-uniq-id'

export const ADD_ALIEN = 'aliens/ADD_ALIEN'
export const UPDATE_ALIEN_SPECIE = 'aliens/UPDATE_ALIEN_SPECIE'
export const SORT_BY = 'aliens/SORT_BY'

export const JUST_INTERACTED = 'defaults/JUST_INTERACTED'

const initialState = {
  list: [{ id: '1', name: 'hehe', species: ['nordics'] }],
  sorted: {
    value: 'name',
    by: 'asc',
  },
}

// eslint-disable-next-line complexity
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ALIEN: {
      const { name, species } = action.data.alien
      const { list: rawList, sorted } = state

      const listSortedByName = _.sortBy([
        ...rawList,
        {
          id: generateUniqId(),
          name,
          species,
        },
      ], 'name')
      const list = sorted.by === 'desc' ? listSortedByName.reverse() : listSortedByName

      return {
        ...state,
        list,
        sorted: {},
      }
    }

    case UPDATE_ALIEN_SPECIE: {
      const { id, specieslug, value } = action

      const { list: rawList } = state
      const list = rawList.map((alien) => {
        /* eslint-disable no-param-reassign */
        if (id === alien.id) {
          const alienSpecies = alien.species || []

          if (value) alien.species = alienSpecies.concat(specieslug)
          else alien.species = alienSpecies.filter(specie => (specie !== specieslug))
        }
        /* eslint-enable no-param-reassign */

        return alien
      })

      return {
        ...state,
        list,
        sorted: {},
      }
    }

    case SORT_BY: {
      const { sorted } = state
      const { value } = action
      const { list: rawList } = state
      let list = _.sortBy(rawList, 'name')
      let by = 'asc'

      if (value === sorted.value) {
        if (sorted.by === 'asc') by = 'desc'
        if (sorted.by === 'desc') by = 'asc'
      }

      if (value !== 'name') {
        // eslint-disable-next-line complexity
        list = list.sort((firstAlien, secondAlien) => {
          const firstAlienSpecies = firstAlien.species
          const secondAlienSpecies = secondAlien.species
          const isDesc = by === 'desc'

          if (firstAlienSpecies.indexOf(value) !== -1 &&
              secondAlienSpecies.indexOf(value) === -1) return isDesc ? 1 : -1

          if (firstAlienSpecies.indexOf(value) === -1 &&
              secondAlienSpecies.indexOf(value) !== -1) return isDesc ? -1 : 1

          if (firstAlien.name < secondAlien.name) return isDesc ? 1 : -1
          if (firstAlien.name > secondAlien.name) return isDesc ? -1 : 1

          return 0
        })
      } else if (by === 'desc') list = list.reverse()

      return {
        ...state,
        list,
        sorted: { value, by },
      }
    }

    default:
      return state
  }
}

export const addAlien = (alien) => {
  const trigger = (dispatch) => {
    dispatch({ type: JUST_INTERACTED })

    dispatch({
      type: ADD_ALIEN,
      data: { alien },
    })
  }

  return trigger
}

export const updateAlienSpecie = (id, specieslug, value) => {
  const trigger = (dispatch) => {
    dispatch({ type: JUST_INTERACTED })

    dispatch({
      type: UPDATE_ALIEN_SPECIE,
      id,
      specieslug,
      value,
    })
  }

  return trigger
}

export const sortBy = (value) => {
  const trigger = (dispatch) => {
    dispatch({
      type: SORT_BY,
      value,
    })
  }

  return trigger
}

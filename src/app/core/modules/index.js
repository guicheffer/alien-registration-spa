import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import aliens from '../../main/modules/aliens'
import defaults from '../../main/modules/defaults'

export default combineReducers({
  aliens,
  defaults,
  routing: routerReducer,
})

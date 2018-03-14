import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import rootReducer from './modules'

export const history = createHistory()

// eslint-disable-next-line no-undef
const browser = window

const initialState = {}
const enhancers = []
const middleware = [
  thunk,
  routerMiddleware(history),
]

if (process.env.NODE_ENV === 'development') {
  const { devToolsExtension } = browser

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers,
)

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers,
)

export default store

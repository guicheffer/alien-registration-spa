/*-
 * ⭐️ MainEntry
 *
 * This is the main entry file for the labfolder coding challenge.
 *
-*/

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from '../core/store'

import AbstractEntry from '../core/entry'

import Home from './home'
import About from './about'

// eslint-disable-next-line no-undef
const browser = window

class MainEntry extends AbstractEntry {
  render () {
    ReactDOM.render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <header>
              <Link to="/">Home</Link>
              <Link to="/xcv9xccbuyvbivuy">About</Link>
            </header>

            <main>
              <Route exact path="/" component={Home} />
              <Route exact path="/xcv9xccbuyvbivuy/:quality" component={About} />
            </main>
          </div>
        </ConnectedRouter>
      </Provider>,
      this.ui.app,
    )
  }

  start ({ initilizationData }) {
    this.initilizationData = initilizationData

    this.ui = {
      app: browser.document.querySelector('#app-alien-registration'),
    }

    this.render()
  }
}

export default MainEntry

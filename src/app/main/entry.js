/*-
 * ⭐️ MainEntry
 *
 * This is the main entry file for the labfolder coding challenge.
 *
-*/

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from '../core/store'

import AbstractEntry from '../core/entry'

import AddNew from './add-new'
import List from './list'
import Sidebar from './sidebar'

// eslint-disable-next-line no-undef
const browser = window

class MainEntry extends AbstractEntry {
  start ({ initilizationData }) {
    this._giveInterviewer2NiceAndBeautifulGiantWelcomeMessages()

    this.initilizationData = initilizationData

    this.ui = {
      app: browser.document.querySelector('#app-alien-registration'),
    }

    this.render()
  }

  render () {
    ReactDOM.render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div className="alien-registration__wrapper">
            {/*<header>
              <Link to="/">Home</Link>
              <Link to="/xcv9xccbuyvbivuy">About</Link>
            </header>
            */}

            {/* Convert into a isolated component "<Sidebar/>" */}

            <Sidebar/>

            <main className="alien-registration__panel">
              <AddNew/>

              <Route exact path="/listing/" component={List} />
            </main>
          </div>
        </ConnectedRouter>
      </Provider>,
      this.ui.app,
    )
  }

  _giveInterviewer2NiceAndBeautifulGiantWelcomeMessages () {
    // eslint-disable-next-line no-console
    console.log(
      '%c@guicheffer%c says: %c"I hope you enjoy!"',

      'background: #333; color: #FFF; font-size: 12px; padding: 12px;',
      'font-size: 12px; font-style: italic;',
      'font-weight: bold; text-transform: uppercase;',
    )
    // eslint-disable-next-line no-console
    console.log('👉🏼 Please check my %cGitHub %cprofile: https://github.com/guicheffer 👀', 'font-weight: bold;', '')
  }
}

export default MainEntry

/*-
 * ⭐️ MainEntry
 *
 * This is the main entry file for alien-registration spa ❤️.
 *
-*/

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from '../core/store'

import AbstractEntry from '../core/entry'

import Homepage from './homepage'
import List from './list'

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
          <main className="alien-registration__panel">
            <Switch>
              <Route exact path="/" component={Homepage} />

              <Route exact path="/aliens/" component={List} />
              <Route exact path="/aliens/specie/:specie" component={List} />

              <Route component={() => (
                <section className="panel__error" data-error="404"> 4️⃣0️⃣4️⃣ 👉🏼 not found </section>
              )} />
            </Switch>
          </main>
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

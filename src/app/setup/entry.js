/*-
 * ⭐️ Setup start
 *
 * Responsible for the main SPA webapp imports
 *
-*/

import MainEntry from '../main/entry'

// eslint-disable-next-line no-undef
const browser = window

const { document } = browser

const initialize = () => {
  if (browser.setupApp) {
    browser.setupApp({
      before: (appName = 'App') => {
        browser[appName] = {
          MainEntry,
        }
      },
    })
  } else { throw Error('Missing setup app implementation.') }
}

if (['complete', 'loaded', 'interactive'].includes(document.readyState)) {
  initialize()
} else {
  browser.addEventListener('DOMContentLoaded', initialize, false)
}

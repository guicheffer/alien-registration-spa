/*-
 * ⭐️ Helper which makes easier to store data
 *  objects and texts on browser
 *
-*/

// eslint-disable-next-line no-undef
const browser = window

const localStorage = {
  setItem: (item, rawValue) => {
    if (!browser.localStorage) return true

    const value = (typeof rawValue === 'object') ? JSON.stringify(rawValue) : rawValue

    return browser.localStorage.setItem(item, value)
  },

  getItem: (item, isObject = false) => {
    if (!browser.localStorage) return isObject ? [] : ''

    const value = browser.localStorage.getItem(item)

    return isObject ? JSON.parse(value) : value
  },
}

export default localStorage

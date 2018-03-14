/*-
 * ⭐️ Helper which helps localStorage to be stored
 *  emails or texts which has been valid before
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

  getItem: (item, multiple = 'false') => {
    if (!browser.localStorage) return multiple ? [] : ''

    const value = browser.localStorage.getItem(item)

    return multiple ? JSON.parse(value) : value
  },
}

export default localStorage

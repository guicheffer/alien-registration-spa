/*-
 * ⭐️ Helper which gets initialization data variables
 *
-*/

// eslint-disable-next-line no-undef
const browser = window

export const getTitle = (prefix = '') => {
  const { metaTitle } = browser.getInitializationData()

  //  Sorry for this being hard-coded 😔, but got lost in time and
  // I prefered let like this
  return `${prefix.charAt(0).toUpperCase()}${prefix.substr(1)} > ${metaTitle}`
}

export default name => browser.getInitializationData()[name]

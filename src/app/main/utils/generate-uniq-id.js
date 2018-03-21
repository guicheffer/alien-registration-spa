/*-
 * ⭐️ Generate uniq id
 *
 *  This helps to create an unique id for each alien;
 *  This way, each alien should have an unique id
 * and updates or any changes such as deletions
 * should work just fine!
 *
-*/

// eslint-disable-next-line no-undef
const browser = window

export default () => (`id-${browser.Math.random().toString(36).substr(2, 9)}`)

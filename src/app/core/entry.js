/*- ⭐️ Abstract Entry Point
 * ----------------------------------------------
 *
 * Each page has its own entry in a way that bundles can be loaded separately. This abstraction
 * offers a simple way to create new bundles/entries by exposing a registry DSL that will be used
 * to start each dependency.
 *
 * React's Application is being extended used, so it becomes an obvious starting point. Every
 * dependency and set of page components are started here through declarative registers
 * `stores`, `actions`, `dispatchers`, `stores` and `views`.
 *
-*/

class AbstractEntry {
  constructor ({ initilizationData }) { this._setup({ initilizationData }) }

  _setup ({ initilizationData }) {
    this.start({ initilizationData })
  }

  start () { throw Error('Missing start implementation.') }
}

export default AbstractEntry

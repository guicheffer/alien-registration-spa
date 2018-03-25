import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { add } from './modules/aliens'

// eslint-disable-next-line no-undef
const browser = window

const DEFAULT_MAX_LENGTH = 30
const DEFAULT_TABLE_PADDING = 48

class AddNew extends Component {
  constructor (props) {
    super(props)
    this.species = []
  }

  render () {
    return (
      <section className="panel__add-new">
        <form onSubmit={ this.handleSubmit.bind(this) }>
          <label htmlFor="name" className="add-new__label"> Add new alien </label>

          <div className="add-new__field">
            <input
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              autoFocus
              className="add-new__input"
              id="name"
              maxLength={DEFAULT_MAX_LENGTH}
              name="name"
              pattern={`[A-Za-z0-9 ]{3,${DEFAULT_MAX_LENGTH}}`}
              placeholder="Name"
              ref={(input) => { this.input = input }}
              required="required"
              spellCheck="false"
              type="text"
            />

            <ul className="add-new__species">
              { this.props.species.map((specie, index) => (
                <li className="add-new__specie" key={index}>
                  <input
                    ref={(input) => { this.species.push(input) }}
                    type="checkbox" id={`specie-index-${index}`}
                    value={specie.slug}
                    defaultChecked={specie.slug === 'unknown'}
                  />
                  <label htmlFor={`specie-index-${index}`}> {specie.name} </label>
                </li>
              )) }
            </ul>

            <button
              className="add-new__go"
              type="submit"
            > Add Alien </button>
          </div>
        </form>
      </section>
    )
  }

  _afterAdding () {
    this.props.changePage()
    this.input.value = ''

    const scrollableTable = browser.document.querySelector('.js-scrollable-table')
    const justInserted = browser.document.querySelector('.just-inserted')

    scrollableTable.scrollTo(0, justInserted.offsetTop - DEFAULT_TABLE_PADDING)
  }

  handleSubmit (e) {
    e.preventDefault()
    e.stopPropagation()

    const name = this.input.value
    const species = this.species.reduce((speciesValues, specie) => {
      if (specie.checked) speciesValues.push(specie.value)

      return speciesValues
    }, [])

    if (!species.length) {
      // eslint-disable-next-line no-undef, no-alert
      alert('⚠️ Please, select at least one type of a specie!')
      return false
    }

    this.props.add({ name, species })
    this._afterAdding()

    return true
  }
}

const mapStateToProps = state => ({ species: state.defaults.species })

const mapDispatchToProps = dispatch => bindActionCreators({
  add,
  changePage: () => {
    if (browser.location.pathname.indexOf('/aliens/') !== -1) return { type: null }

    return push('/aliens/')
  },
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddNew)

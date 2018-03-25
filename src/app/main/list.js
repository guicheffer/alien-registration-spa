import _ from 'lodash'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import AddNew from './add-new'
import Sidebar from './sidebar'

import { getTitle } from '../helpers/get-initialization-data'
import getSpeciesByAlien from './utils/get-species-by-alien'

import { remove, sortBy, updateSpecie } from './modules/aliens'
import { requestDeletion, updateList } from './modules/defaults'

// eslint-disable-next-line no-undef
const browser = window

class List extends Component {
  constructor (props) {
    super(props)
    this.state = { aliens: [] }
  }

  render () {
    const { params } = this.props.match
    const { aliens } = this.state
    const {
      filteredSpecies,
      interacted,
      species,
    } = this.props
    const currentSpecieSlug = params.specie || ''

    return (
      <div className="panel__content panel__list">
        <Helmet>
          <title>
            { getTitle((currentSpecieSlug || 'Aliens')) }
          </title>
        </Helmet>

        <Sidebar params={params}/>

        <div className="list__wrapper">
          <AddNew/>

          <div
            className={`list__table js-scrollable ${aliens.length >= 1 ? 'scrollable scrollable--bottom' : ''}`}
          >
            <div className="table__scrollable js-scrollable-table">
              <table className="table__itself">
                <thead>
                  <tr>
                    <th>
                      {aliens.length ? this._sortedBy('name') : ''} Name

                      <div>
                        <a
                          href="#"
                          data-sort-by="name"
                          onClick={this._handleSort.bind(this)}
                        > <span> {aliens.length ? this._sortedBy('name') : ''} </span> Name </a>
                      </div>
                    </th>
                    { species.map((specie, specieKey) => (
                      <th key={specieKey}>
                        {this._sortedBy(specie.slug)} {specie.name}

                        <div>
                          <a
                          href="#"
                          data-sort-by={specie.slug}
                          onClick={this._handleSort.bind(this)}
                          > <span> {this._sortedBy(specie.slug)} </span> {specie.name} </a>
                        </div>
                      </th>
                    ))}

                    <th>
                      Delete?

                      <div> Delete? </div>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  { aliens.length ?
                      aliens.map(alien => this._createRow(alien, alien.id, species))
                    : (
                      <tr>
                        <td colSpan={species.length + 2}> Empty results </td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
          </div>

          {
            params.specie && interacted ?
              <small className="list__warning">
                <Link to='/aliens/' onClick={this.props.updateList}>
                  You are probally viewing results under the filters that are updated.
                  Please click here to show up full results.
                </Link>
              </small>
            : ''
          }

          <ul className="list__links">
            { filteredSpecies.map((specie, index) => (
              <li className="list__link" key={index}>
                <Link
                  to={`/aliens/specie/${specie.slug}/`}
                  disabled={specie.slug === currentSpecieSlug}
                > {specie.name} </Link>
              </li>
            )) }
          </ul>
        </div>
      </div>
    )
  }

  _createRow (alien, id, species) {
    const { isDeleting } = this.props

    return (
      <tr key={id} data-just-inserted={alien.justInserted}>
        <td> {alien.name} </td>

        { species.map((specie, specieKey) => (
          <td key={specieKey}>
            <input
              checked={_.includes(alien.species, specie.slug)}
              onChange={event =>
                  this.props.updateSpecie(
                    id,
                    specie.slug,
                    event.target.checked,
                  )}
              type="checkbox"
            />
          </td>
        )) }

        <td className="table__delete-it">
          { isDeleting === id ?
              <p>
                <a data-next-step="proceed" href="#" title="Delete it!"> 👍🏼 </a> |
                <a data-next-step="cancel" href="#" title="No. Please. No"> 👎🏼 </a>
              </p>
            : <a href="#" onClick={event => this._requestDeletion(event, id)}> ❌ </a>
          }
        </td>
      </tr>
    )
  }

  _handleSort (event) {
    const by = event.target.getAttribute('data-sort-by')
    this.props.sortBy(by)

    event.preventDefault()
  }

  _sortedBy (isSortedBy) {
    const { sorted } = this.props
    if (!sorted) return null
    const mapSortedBy = { asc: '🔼', desc: '🔽' }

    if (isSortedBy === sorted.value) return mapSortedBy[sorted.by]
    return null
  }

  _filterBySpecie (aliens, specie) {
    return aliens.filter(alien => (alien.species.indexOf(specie) !== -1))
  }

  _requestDeletion (event, id) {
    this.props.requestDeletion(id)

    const onPageClick = (e) => {
      browser.document.body.removeEventListener('click', onPageClick)
      const nextStep = e.target.getAttribute('data-next-step')

      if (nextStep) e.preventDefault()
      if (nextStep === 'proceed') return this.props.remove(id)

      this.props.requestDeletion(false)

      return null
    }

    browser.document.body.addEventListener('click', onPageClick)
    event.preventDefault()
  }

  componentDidMount () {
    const scrollable = browser.document.querySelector('.js-scrollable')
    const scrollableTable = browser.document.querySelector('.js-scrollable-table')

    scrollableTable.addEventListener('scroll', () => {
      if (scrollableTable.scrollTop === 0) {
        scrollable.classList.remove('scrollable--top')
        scrollable.classList.add('scrollable--bottom')
      } else {
        scrollable.classList.remove('scrollable--bottom')
        scrollable.classList.add('scrollable--top')
      }
    })
  }

  componentWillMount () {
    const { specie = null } = this.props.match.params
    const aliens = specie ? this._filterBySpecie(this.props.aliens, specie) : this.props.aliens

    this.setState({ aliens })
  }

  componentWillReceiveProps (nextProps) {
    const { specie = null } = nextProps.match.params
    const aliens = specie ? this._filterBySpecie(nextProps.aliens, specie) : nextProps.aliens

    this.setState({ aliens })
  }
}

const mapStateToProps = state => ({
  aliens: state.aliens.list,
  filteredSpecies: getSpeciesByAlien(state.defaults.species, state.aliens.list),
  interacted: state.defaults.interacted,
  isDeleting: state.defaults.isDeleting,
  sorted: state.aliens.sorted,
  species: state.defaults.species,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  remove,
  requestDeletion,
  sortBy,
  updateSpecie,
  updateList,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(List)

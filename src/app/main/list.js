import _ from 'lodash'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  sortBy,
  updateAlienSpecie,
} from './modules/aliens'

class List extends Component {
  render () {
    const { aliens, species } = this.props

    return (
      <table className="panel__list">
        <thead>
          <tr>
            <th>
              <a
                href="#"
                data-sort-by="name"
                onClick={this._handleSort.bind(this)}
              > {aliens.length ? this._sortedBy('name') : ''} Name </a>
            </th>

            { species.map((specie, specieKey) => (
                <th key={specieKey}>
                  <a
                    href="#"
                    data-sort-by={specie.slug}
                    onClick={this._handleSort.bind(this)}
                  > {this._sortedBy(specie.slug)} {specie.name} </a>
                </th>
              ))
            }

            <th> Delete? </th>
          </tr>
        </thead>

        <tbody>
          { aliens.length ?
              aliens.map((alien, alienKey) => this._createRow(alien, alienKey, species))
            : (
              <tr>
                <td colSpan={species.length + 2}> Empty results </td>
              </tr>
            )
          }
        </tbody>
      </table>
    )
  }

  _createRow (alien, alienKey, species) {
    return (
      <tr key={alienKey}>
        <td> {alien.name} </td>

        { species.map((specie, specieKey) => (
          <td key={specieKey}>
            <input
              checked={_.includes(alien.species, specie.slug)}
              onChange={event =>
                  this.props.updateAlienSpecie(
                    alienKey,
                    specie.slug,
                    event.target.checked,
                  )}
              type="checkbox"
            />
          </td>
        )) }

        <td> ❌ </td>
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

  shouldComponentUpdate () { return true }
}

const mapStateToProps = state => ({
  aliens: state.aliens.list,
  sorted: state.aliens.sorted,
  species: state.defaults.species,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  sortBy,
  updateAlienSpecie,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(List)

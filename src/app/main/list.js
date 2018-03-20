import _ from 'lodash'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { updateAlienSpecie } from './modules/aliens'

class List extends Component {
  render () {
    const { aliens, species } = this.props

    if (aliens.length === 5) debugger

    return (
      <table className="panel__list">
        <thead>
          <tr>
            <th> <a href="#" onClick={this._handleSort.bind(this, 'hehe')}> Name </a> </th>

            { species.map((specie, specieKey) => (
                <th key={specieKey}>
                  <a href="#" onClick={this._handleSort.bind(this)}> {specie.name} </a>
                </th>
              ))
            }

            <th> Delete? </th>
          </tr>
        </thead>

        <tbody>
          { aliens.map((alien, alienKey) => this._createRow(alien, alienKey, species)) }
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
              checked={_.includes(alien.species, specie.slugId)}
              onChange={event =>
                  this.props.updateAlienSpecie(
                    alienKey,
                    specie.slugId,
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

  _handleSort (e, sortBy) {
    e.preventDefault()
    e.stopPropagation()
    console.log('clicked', sortBy)
  }

  shouldComponentUpdate () { return true }
}

const mapStateToProps = state => ({
  aliens: state.aliens.list,
  species: state.defaults.species,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  updateAlienSpecie,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(List)

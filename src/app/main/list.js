import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'

class List extends Component {
  render () {
    return (
      <table className="panel__list">
        <thead>
          <tr>
            <th> Name </th>

            { this.props.species.map((specie, index) => <th key={index}> {specie.name} </th>) }

            <th> Delete? </th>
          </tr>
        </thead>

        <tbody>
          { this.props.aliens.map((alien, key) => this._createRow(alien, key)) }
        </tbody>
      </table>
    )
  }

  shouldComponentUpdate () { return true }

  _createRow (alien, key) {
    return (
      <tr key={key}>
        <td> {alien.name} </td>

        { this.props.species.map((specie, index) => (
          <td key={index}> {_.includes(alien.species, specie.slugId) ? '✅' : ''} </td>
        )) }

        <td> ❌ </td>
      </tr>
    )
  }
}

const mapStateToProps = state => ({
  aliens: state.aliens,
  species: state.defaults.species,
  // isIncrementing: state.counter.isIncrementing,
  // isDecrementing: state.counter.isDecrementing,
})
//
// const mapDispatchToProps = dispatch => bindActionCreators({
//   increment,
//   incrementAsync,
//   decrement,
//   decrementAsync,
//   changePage: () => push('/about-us'),
// }, dispatch)

export default connect(
  mapStateToProps,
  () => ({}),
)(List)

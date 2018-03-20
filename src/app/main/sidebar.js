import _ from 'lodash'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Sidebar extends Component {
  render () {
    return (
      <aside className="alien-registration__sidebar">
        <h2>
          <Link className="total" to='/listing/'> Total Aliens {this.props.totalAliens} </Link>
        </h2>

        <ul className="sidebar__species">
          { this.props.species.map((specie, index) => (
            <li key={index}>
              <Link to={`/listing/${specie.slugId}/`}> {specie.name}: {specie.total} </Link>
            </li>
          )) }
        </ul>
      </aside>
    )
  }
}

const mapStateToProps = state => ({
  species: state.defaults.species.reduce((species, specie) => {
    const aliens = state.aliens.list.filter(alien => _.includes(alien.species, specie.slugId))

    if (aliens.length) {
      species.push({
        total: aliens.length,
        ...specie,
      })
    }

    return species
  }, []),
  totalAliens: state.aliens.list.length,
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
)(Sidebar)

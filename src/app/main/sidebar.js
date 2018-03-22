import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import getSpeciesByAlien from './utils/get-species-by-alien'

class Sidebar extends Component {
  render () {
    return (
      <aside className="alien-registration__sidebar">
        <h2 className="sidebar">
          <Link className="total" to='/aliens/'> Total Aliens {this.props.totalAliens} </Link>
        </h2>

        <ul className="sidebar__species">
          { this.props.filteredSpecies.map((specie, index) => (
            <li key={index}>
              <Link to={`/aliens/specie/${specie.slug}/`}> {specie.name}: {specie.total} </Link>
            </li>
          )) }
        </ul>
      </aside>
    )
  }
}

const mapStateToProps = state => ({
  filteredSpecies: getSpeciesByAlien(state.defaults.species, state.aliens.list),
  totalAliens: state.aliens.list.length,
})

export default connect(
  mapStateToProps,
  () => ({}),
)(Sidebar)

/*-
 * ⭐️ Species by Alies util
 *
 *  This helps to bring only those species that contains
 * at least one alien
 *
-*/

import _ from 'lodash'

export default (rawSpecies, rawAliens) => rawSpecies.reduce((species, specie) => {
  const aliens = rawAliens.filter(alien => _.includes(alien.species, specie.slug))

  if (aliens.length) {
    species.push({
      total: aliens.length,
      ...specie,
    })
  }

  return species
}, [])

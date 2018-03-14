import React from 'react'

export default props => (
  <div>
    <h1>About Us on: {props.match.params.quality}</h1>
    <p>Hello everyone!</p>
  </div>
)

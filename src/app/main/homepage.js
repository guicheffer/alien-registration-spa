import React from 'react'
import { Helmet } from 'react-helmet'

import AddNew from './add-new'
import Sidebar from './sidebar'

import { getTitle } from '../helpers/get-initialization-data'

export default () => (
  <div className="panel__content panel__homepage">
    <Helmet>
        <title> {getTitle('Home')} </title>
    </Helmet>

    <Sidebar/>

    <AddNew/>
  </div>
)

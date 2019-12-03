import React from 'react'
import css from './sidebar.module.css'
import {Link} from 'react-router-dom'

const Sidebar = ({
  open = true
}) => {

  return (
    <div className={css.Sidebar}>
      <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/cwl/war/this-is-a-custom-link-tag'>CWL_WAR_TAG</Link></li>
        </ul>
    </div>
  )

}


export default Sidebar
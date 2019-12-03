import React, {useState, useContext} from 'react'
import css from './sidebar.module.css'
import {Link} from 'react-router-dom'
import { CWLContext } from '../../App'

import * as axios from '../../network/cwl-axios'


const DODOLANDIA_TAG = 'YQP0P9PP'

const Sidebar = ({
  open = true
}) => {

  const {state, dispatch} = useContext(CWLContext)
  const [cwl, setCwl] = useState({"season": "2019-11"})
  const [clanTag, setClanTag] = useState(DODOLANDIA_TAG)
  const [loading, setLoading] = useState(false)

  const onTagChange = (e) => {
    setClanTag(e.target.value)
  }

  const cwlData = async(e, clanTag = DODOLANDIA_TAG) => {
    try {
      setLoading(true)
      const res = await axios.getClanLeague(clanTag)
      setCwl(res.data)
      dispatch({ type: 'UPDATE_CWL', data: res.data})
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }    
  }

  const attachedCSS = [css.Sidebar, open ? css.Open : css.Close].join(' ')
  return (
    <div className={attachedCSS}>
      #<input value={clanTag} onChange={onTagChange}/>
      <button onClick={cwlData} disabled={loading}> Cauta </button>
      <ul className={css.LinksList}>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/cwl/war/this-is-a-custom-link-tag'>CWL_WAR_TAG</Link></li>
        </ul>
    </div>
  )

}


export default Sidebar
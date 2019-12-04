import React, {useState, useContext} from 'react'
import css from './sidebar.module.css'
import {NavLink, withRouter} from 'react-router-dom'
import { CWLContext } from '../../App'
import {Redirect} from 'react-router-dom'

import * as axios from '../../network/cwl-axios'


const DODOLANDIA_TAG = 'YQP0P9PP'

const Sidebar = ({
  open = true
}) => {

  const {state, dispatch} = useContext(CWLContext)
  const [cwl, setCwl] = useState(null)
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

  function cwlWarTagLink (tag) { 
    return '/cwl/war/' + (tag.replace(/#/, ''))
  }

  const cwlTagsLink = (cwl) => {
    if (cwl === null) return null
    const list = cwl.rounds.map( (warTags, index) => {
      console.log(warTags.warTags);
      // groups not ready yet, don't display as contain no informatino
      if (/#0/.test(warTags.warTags[0])) return null

      return (
        <li key={index}>
          <div >
            <p>Runda {index+1}</p>
            <NavLink to={cwlWarTagLink(warTags.warTags[0])}>Grupul 1 </NavLink>
            <NavLink to={cwlWarTagLink(warTags.warTags[1])}>Grupul 2 </NavLink>
            <NavLink to={cwlWarTagLink(warTags.warTags[2])}>Grupul 3 </NavLink>
            <NavLink to={cwlWarTagLink(warTags.warTags[3])}>Grupul 4 </NavLink>
          </div>
        </li>
      )
    });
    return list
  }

  const attachedCSS = [css.Sidebar, open ? css.Open : css.Close].join(' ')
  return (
    <div className={attachedCSS}>
      #<input value={clanTag} onChange={onTagChange}/>
      <button onClick={cwlData} disabled={loading}> Cauta </button>
      <ul className={css.LinksList}>
      <li><NavLink to='/'>Toate Clanurile</NavLink></li>
          {cwlTagsLink(cwl)}
        </ul>
    </div>
  )

}


export default withRouter(Sidebar)
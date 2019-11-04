import React, { useState } from 'react';
import * as axios from '../../network/cwl-axios'
import {clanLeague} from '../../sampleData/clanLeague'
import Clan from '../../components/clan/clan'
import css from './cwl.module.css'

const CWL = () => {
const DODOLANDIA_TAG = 'YQP0P9PP'
  // Declare a new state variable, which we'll call "count"
  const [cwl, setCwl] = useState({"season": "2019-11"})
  const [clanTag, setClanTag] = useState(DODOLANDIA_TAG)
  const [loading, setLoading] = useState(false)

  console.log(clanLeague);
  const cwlData = async(e, clanTag = DODOLANDIA_TAG) => {
    try {
      setLoading(true)
      const res = await axios.getClanLeague(clanTag)
      setCwl(res.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }    
  }

  const clansColumns = clans => {
    if (clans)
      return clans.map(clan => {
        return <Clan clan={clan}></Clan>
      })
    return null
  }


  const hasObjectAtIndex = (members, index) => {    
    const sortFirst = members.sort((a, b) => (a.townHallLevel > b.townHallLevel) ? -1 : ((a.townHallLevel < b.townHallLevel) ? 1 : 0))    
    if (sortFirst.length-1 >= index) 
      return `${sortFirst[index].name} - th${sortFirst[index].townHallLevel}`
    return 'null' 
  }

  const largerMemberList = clans => {
    return clans.sort((a, b) => (a.members.length > b.members.length) ? -1 : ((a.members.length < b.members.length) ? 1 : 0))[0].members.length
  }

  const tableRows = (clans) => {
    if (clans === undefined) return null

    const largestClan = largerMemberList(clans)
    console.log(largestClan);
    
    let rows = []
    rows.push(
      <tr>
        <th><img src={clans[0].badgeUrls.small} alt="clanBadge" /> {clans[0].name}-{clans[0].members.length}</th>
        <th><img src={clans[1].badgeUrls.small} alt="clanBadge" /> {clans[1].name}-{clans[1].members.length}</th>
        <th><img src={clans[2].badgeUrls.small} alt="clanBadge" /> {clans[2].name}-{clans[2].members.length}</th>
        <th><img src={clans[3].badgeUrls.small} alt="clanBadge" /> {clans[3].name}-{clans[3].members.length}</th>
        <th><img src={clans[4].badgeUrls.small} alt="clanBadge" /> {clans[4].name}-{clans[4].members.length}</th>
        <th><img src={clans[5].badgeUrls.small} alt="clanBadge" /> {clans[5].name}-{clans[5].members.length}</th>
        <th><img src={clans[6].badgeUrls.small} alt="clanBadge" /> {clans[6].name}-{clans[6].members.length}</th>
        <th><img src={clans[7].badgeUrls.small} alt="clanBadge" /> {clans[7].name}-{clans[7].members.length}</th>
      </tr>
    )

    for (let i = 0; i < largestClan; i++) {

      rows.push(
        <tr>
          <td>{hasObjectAtIndex(clans[0].members, i)}</td>
          <td>{hasObjectAtIndex(clans[1].members, i)}</td>
          <td>{hasObjectAtIndex(clans[2].members, i)}</td>
          <td>{hasObjectAtIndex(clans[3].members, i)}</td>
          <td>{hasObjectAtIndex(clans[4].members, i)}</td>
          <td>{hasObjectAtIndex(clans[5].members, i)}</td>
          <td>{hasObjectAtIndex(clans[6].members, i)}</td>
          <td>{hasObjectAtIndex(clans[7].members, i)}</td>
        </tr>
      )
    }

    return rows
  }


  return (
    <div>
      #<input value={clanTag} />
      <button onClick={cwlData} disabled={loading}> Cauta </button>
      <table className={css.CompareTable}>
        {tableRows(cwl.clans)}
      </table>
    </div>
  );
}

export default CWL
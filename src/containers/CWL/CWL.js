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
      setCwl(clanLeague)
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



  return (
    <div>
      #<input value={clanTag} />
      <button onClick={cwlData} disabled={loading}> Cauta </button>
      <section className={css.CompareSection}>
        {clansColumns(cwl.clans)}
      </section>
    </div>
  );
}

export default CWL
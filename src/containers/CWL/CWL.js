import React, { useState } from 'react';
import * as axios from '../../network/cwl-axios'
import {clanLeague} from '../../sampleData/clanLeague'
import Clan from '../../components/clan/clan'

const CWL = () => {
const DODOLANDIA_TAG = 'YQP0P9PP'
  // Declare a new state variable, which we'll call "count"
  const [cwl, setCwl] = useState({"season": "2019-11"});

  console.log(clanLeague);
  const cwlData = async(e, clanTag = DODOLANDIA_TAG) => {    
    // const res = await axios.getClanLeague(clanTag)
    //setCwl(clanLeague)
  }

  return (
    <div>
      <p>You clicked {cwl.season} times</p>
      <button onClick={cwlData}>
        Click me
      </button>
      <section>
        <Clan clan={clanLeague.clans[3]}></Clan>
      </section>
    </div>
  );
}

export default CWL
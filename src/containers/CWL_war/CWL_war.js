import React, { useState } from 'react';
import {clanLeagueWar} from '../../sampleData/clanLeagueWar'
// import css from './cwl_war.module.css'
import WarMap from '../../components/warMap/warMap'
import WarAttackLog from '../../components/warAttackLog/warAttackLog'


const CWL_war = (props) => {
  console.log(props.match.params.tag);
  
  return (
    <div>
      <WarAttackLog clanLeagueWarTag={clanLeagueWar}></WarAttackLog>
      <WarMap clanLeagueWar={clanLeagueWar}></WarMap>
      {/* {compareMapPos()} */}
      {/* {attacksLog(attackLog(clanLeagueWar), clanLeagueWar.clan)} */}
    </div>
  );
}

export default CWL_war
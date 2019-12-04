import React, { useState, useEffect } from 'react';
import css from './cwl_war.module.css'
import WarMap from '../../components/warMap/warMap'
import WarAttackLog from '../../components/warAttackLog/warAttackLog'
import * as axios from '../../network/cwl-axios'
import { useParams } from 'react-router'

const CWL_war = ({match}) => {
  const {tag} = useParams() 
  console.log("props.tag:", tag, match)

  const [loading, setLoading] = useState(false)
  const [war, setWar] = useState(null)
  
  const cwlData = async() => {
    try {
      setLoading(true)
      console.log('request data to server for tag:', tag);
      
      const res = await axios.getClanLeagueWar(tag)
      setWar(res.data)
      console.log('data.received: ', res.data);
      
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }    
  } 

  useEffect(() => {
    console.log('mounted')
    cwlData()
  }, [match]);
  

const spinner = () => (<p className={css.Loading}>Loading {tag}</p>)
  const info = (infoWar) => {
    console.log("info war is:", infoWar, war, loading);
    
    if (war === null) return null
    return (<div><WarAttackLog clanLeagueWarTag={infoWar}></WarAttackLog> <WarMap clanLeagueWar={infoWar}></WarMap></div>)
  }
  // for githubpages 
  return (
    <div>
      { loading ? spinner() : info(war)}
      {/* {compareMapPos()} */}
      {/* {attacksLog(attackLog(clanLeagueWar), clanLeagueWar.clan)} */}
    </div>
  );
}

export default CWL_war 
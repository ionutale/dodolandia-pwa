import React, { useState } from 'react';
import * as axios from '../../network/cwl-axios'
import {clanLeagueWar} from '../../sampleData/clanLeagueWar'
import css from './cwl_war.module.css'
import WarMap from '../../components/warMap/warMap'
import WarAttackLog from '../../components/warAttackLog/warAttackLog'


const CWL_war = () => {
const DODOLANDIA_TAG = 'YQP0P9PP'

  /**
   * 
   * attack history log
   * 
   */
  const warPlayerObj = (attacker, member) => { return {
    "clan": attacker.name,
    "name": member.name,
    "tag": member.tag,
    "townhallLevel": member.townhallLevel,
    "mapPosition": member.mapPosition
  }}
  const attackObject = (attack, member, deffenders) => {
    return {
      // "attacker": warPlayerObj(attack, member),
      // "defender": warPlayerObj(deffenders, member),
      "stars": attack.stars,
      "destructionPercentage": attack.destructionPercentage,
      "order": attack.order  
    }
  }
  const attacksForClan = (attackers, deffenders) => {
    let attackLog = []

    attackers.members.map( member => {
      if (member.attacks === undefined) return null

      member.attacks.map(attack => {
        const deffender = deffenders.members.find(p => p.tag === attack.defenderTag)
        attackLog.push(attackObject(attack, deffender))
      })
    })
    return attackLog
  }

  const attackLog = clanLeagueWar => {
    let attackLog = []

    const attackers = clanLeagueWar.clan
    const deffenders = clanLeagueWar.opponent
    
    attackLog = [...attacksForClan(attackers, deffenders), ...attacksForClan(deffenders, attackers)]
    attackLog = attackLog.sort((a, b) => (a.order > b.order) ? -1 : ((a.order < b.order) ? 1 : 0))
    console.log(attackLog);
    return attackLog
  }

  const stars = number => '⭐'.repeat(number)

  const attacksLog = (attaksList, mainClan) => {
    const rows = attaksList.map(item => {
      
      if (item.attacker.clan === mainClan.name) {
        return (
          <tr>
            <td>
              {item.order}
            </td>
            <td className={css.Winner}>
            <p><b>{item.attacker.mapPosition}) th{item.attacker.townhallLevel}</b> {item.attacker.name}</p>
            </td>
            <td>
              &gt; 
              <p>
                {stars(item.stars)}  {item.destructionPercentage}%
              </p>
            </td>
            <td className={css.Looser}>
            <p><b>{item.defender.mapPosition}) th{item.defender.townhallLevel}</b> {item.defender.name}</p>
            </td> 
          </tr>
        )
      }
      
      return (
          <tr>
            <td>
              {item.order}
            </td>
            <td className={css.Looser}>
              <p><b>{item.defender.mapPosition}) th{item.defender.townhallLevel}</b> {item.defender.name}</p>
            </td> 
            <td>
            &lt; 
            <p>
              {stars(item.stars)}  {item.destructionPercentage}%
            </p>
            </td>
            <td className={css.Winner}>
              <p><b>{item.attacker.mapPosition}) th{item.attacker.townhallLevel}</b> {item.attacker.name}</p>
            </td> 
          </tr>
        )

    })

    const table = (
      <table className={css.CompareTable}>
        <tr>
          <th>#</th>
          <th><img src={clanLeagueWar.clan.badgeUrls.small} alt="clanBadge" /><p>{clanLeagueWar.clan.name}</p> </th>
          <th>castigator</th>
          <th><img src={clanLeagueWar.opponent.badgeUrls.small} alt="clanBadge" /><p>{clanLeagueWar.opponent.name}</p> </th>
        </tr>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  return table
  } 

  return (
    <div>
      <WarAttackLog clanLeagueWar={clanLeagueWar}></WarAttackLog>
      <WarMap clanLeagueWar={clanLeagueWar}></WarMap>
      {/* {compareMapPos()} */}
      {/* {attacksLog(attackLog(clanLeagueWar), clanLeagueWar.clan)} */}
    </div>
  );
}

export default CWL_war
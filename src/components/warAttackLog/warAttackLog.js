import React from 'react'
import css from './warAttackLog.module.css'

/**
 * Receive all data from clanLeagueWarTag
 * TODO: maybe not a very good idea to send all data here
 */
const WarAttackLog = ({clanLeagueWarTag}) => {
  console.log(clanLeagueWarTag);


  const remapAttacks = clanLeagueWarTag => {
    const clan = extractClanAttacks(clanLeagueWarTag.clan, )
    clan.members.map(player => {
      
    })
    return clan
  }
  console.log(remapAttacks(clanLeagueWarTag));
  
/**
 * fighter object 
 */
  const fighterObject  = (attacker, member) => { return {
    "clan": attacker.name,
    "name": member.name,
    "tag": member.tag,
    "townhallLevel": member.townhallLevel,
    "mapPosition": member.mapPosition
  }}

  /**
   * attackObject
   */

  const attackObject = (attack, member, deffenders) => {
    return {
      // "attacker": warPlayerObj(attack, member),
      // "defender": warPlayerObj(deffenders, member),
      "stars": attack.stars,
      "destructionPercentage": attack.destructionPercentage,
      "order": attack.order  
    }
  }

  /**
   * this method will extract all the attacks of the attacker clan
   * you need to also insert the defender so that it can extract the defender player data
   * like: "name" and  "mapPosition"
   */
  const extractClanAttacks = (attackers, deffenders) => {
    let attackLog = []

    attackers.members.map( member => {
      if (member.attacks === undefined) return null

      member.attacks.map(attack => {
        const deffender = deffenders.members.find(p => p.tag === attack.defenderTag)
        attackLog.push(attackObject(attack, deffender))
        return null
      })
      return null
    })
    return attackLog
  }

  /**
   * attackLog array 
   * 
   */
  const attackLog = clanLeagueWar => {
    let attackLog = []

    const attackers = clanLeagueWar.clan
    const deffenders = clanLeagueWar.opponent
    
    attackLog = [...extractClanAttacks(attackers, deffenders), ...extractClanAttacks(deffenders, attackers)]
    attackLog = attackLog.sort((a, b) => (a.order > b.order) ? -1 : ((a.order < b.order) ? 1 : 0))
    console.log(attackLog);
    return attackLog
  }

  /** 
   * return the start to display 
   * TODO: add also empty stars
   */
  const stars = number => '⭐'.repeat(number)

  /**
   * return the table rows
   * but please revise this part. is outrages
   */

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
          <th><img src={clanLeagueWarTag.clan.badgeUrls.small} alt="clanBadge" /><p>{clanLeagueWarTag.clan.name}</p> </th>
          <th>castigator</th>
          <th><img src={clanLeagueWarTag.opponent.badgeUrls.small} alt="clanBadge" /><p>{clanLeagueWarTag.opponent.name}</p> </th>
        </tr>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  return table
  } 

  return (
    <div>WarAttackLog</div>
  )
}

export default WarAttackLog
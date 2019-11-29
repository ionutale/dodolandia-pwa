import React from 'react'
import css from './warAttackLog.module.css'
/**
 * Receive all data from clanLeagueWarTag
 * TODO: maybe not a very good idea to send all data here
 */
const WarAttackLog = ({clanLeagueWarTag}) => {

  const sortAttacks = (a, b) => (a.order < b.order) ? -1 : ((a.order < b.order) ? 1 : 0)

  console.log(clanLeagueWarTag);
  // create a unique list of payers with clan name and attacks array
  function remapAttacks() {
    const players = [
      ...clanLeagueWarTag.clan.members.map(player => {return {...player, "clan": clanLeagueWarTag.clan.name}}),
      ...clanLeagueWarTag.opponent.members.map(player => {return {...player, "clan": clanLeagueWarTag.clan.name}})
    ]
    console.log(players)
    // create a unique list of attacks only 
    const attacks = players
      .filter(({attacks}) => attacks !== undefined)
      .map(({attacks}) => { return attacks})
      .flat()
      .sort(sortAttacks)
      .map( attack => {
        return {
          ...attack,
          // may you should not use the name, and use the entire document, 
          // this way you can insert more info into the list table
          attackerName: players.find(p => p.tag === attack.attackerTag),
          defenderName: players.find(p => p.tag === attack.defenderTag),
        }
      })
    
    return attacks
  }
  console.log("remapAttacks:", remapAttacks());



  /** 
   * return the start to display 
   * TODO: add also empty stars
   */
  const stars = number => '⭐'.repeat(number) // + '⭐'.repeat(3-number)

  /**
   * return the table rows
   * but please revise this part. is outrages 
   */

  const playerInfo = (name, townhallLevel, mapPosition, winOrLoose) => {
    return (
      <td className={css.Winner}>
      <p><b>{mapPosition}) th{townhallLevel}</b> {name}</p>
      </td>
    )
  }

  const tableCount = (index) => (<td>{index}</td>)

  const matchInfo = (stars, destructionPercentage, isThisADefence) => {
    return (
            <td>
              {isThisADefence ? '<' : '>'} 
              <p>
                {stars(stars)}  {destructionPercentage}%
              </p>
            </td>
    )
  }

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
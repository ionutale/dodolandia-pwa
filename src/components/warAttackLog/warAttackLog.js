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
  function remapAttacks(CWLTag) {
    const players = [
      ...CWLTag.clan.members.map(player => {return {...player, "clan": CWLTag.clan.name}}),
      ...CWLTag.opponent.members.map(player => {return {...player, "clan": CWLTag.opponent.name}})
    ]
    console.log("map and unify:", players)
    // create a unique list of attacks only 
    const attacks = players
      .filter(({attacks}) => attacks !== undefined)
      .map(({attacks}) => { return attacks})
      .flat()
      .map( attack => {
        return {
          ...attack,
          // may you should not use the name, and use the entire document, 
          // this way you can insert more info into the list table
          attackerName: players.find(p => p.tag === attack.attackerTag),
          defenderName: players.find(p => p.tag === attack.defenderTag),
        }
      })
      .sort(sortAttacks)

    
    return attacks
  }
  console.log("remapAttacks:", remapAttacks(clanLeagueWarTag));


  /** 
   * return the start to display 
   * TODO: add also empty stars
   */
  const getStarts = number => '⭐'.repeat(number) // + '⭐'.repeat(3-number)

  /**
   * return the table rows
   * but please revise this part. is outrages 
   */

  const playerInfo = (name, townhallLevel, mapPosition, winOrLoose) => {
    return (
      <td className={winOrLoose ? css.Winner : css.Looser }>
        <p><b>{mapPosition}. th{townhallLevel}</b> {name}</p>
      </td>
    )
  }

  const tableCount = (index) => (<td>{index}</td>)

  const matchInfo = ({stars, destructionPercentage}) => {
    return (
            <td>
              <p>
                {getStarts(stars)}  {destructionPercentage}%
              </p>
            </td>
    )
  }

  const attackListTable = () => {
    const attacks = remapAttacks(clanLeagueWarTag)
    const mainClanName = clanLeagueWarTag.clan.name

    console.log(mainClanName, attacks)

    let rows = attacks.map( (attack, index) => {

      // put each player on its own clan row

      let clan1Attack, clan2Attack      
      if (mainClanName === attack.attackerName.clan ) {
        clan1Attack = playerInfo(attack.attackerName.name, attack.attackerName.townhallLevel, attack.attackerName.mapPosition, true)
        clan2Attack = playerInfo(attack.defenderName.name, attack.defenderName.townhallLevel, attack.defenderName.mapPosition, false)

      } else {
        clan1Attack = playerInfo(attack.defenderName.name, attack.defenderName.townhallLevel, attack.defenderName.mapPosition, false)
        clan2Attack = playerInfo(attack.attackerName.name, attack.attackerName.townhallLevel, attack.attackerName.mapPosition, true)
      }

      return (
        <tr key={index}>
          {tableCount(index)}
          {clan1Attack}
          {matchInfo(attack)}
          {clan2Attack}
        </tr>
      )
    })
    return rows
  }

  const attackTable = () => {
    const table = (
      <table className={css.CompareTable}>
        <thead>
          <tr>
            <th>#</th>
            <th><img src={clanLeagueWarTag.clan.badgeUrls.small} alt="clanBadge" /><p>{clanLeagueWarTag.clan.name}</p> </th>
            <th>castigator</th>
            <th><img src={clanLeagueWarTag.opponent.badgeUrls.small} alt="clanBadge" /><p>{clanLeagueWarTag.opponent.name}</p> </th>
          </tr>
        </thead>
        <tbody>
          {attackListTable()}
        </tbody>
      </table>
    )
    return table
  }

  return (

    <div>WarAttackLog
      {attackTable()}
    </div>
  )
}

export default WarAttackLog
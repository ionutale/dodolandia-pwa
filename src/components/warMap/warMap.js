import React from 'react'
import css from './warMap.module.css'

const WarMap = ({clanLeagueWar}) => {

  const sortPlayers = members => members.sort((a, b) => (a.mapPosition < b.mapPosition) ? -1 : ((a.mapPosition < b.mapPosition) ? 1 : 0))
  const playersTableRows = (clan, opponent) => {
    let rows = []
    for (let i = 0; i < 14; i++) {
      const player = clan[i];
      const opp = opponent[i];
      
      rows.push(
        <tr>
          <td>{player.mapPosition} {player.name} - {player.townhallLevel}</td>
          <td>{opp.mapPosition} {opp.name} - {opp.townhallLevel}</td>
        </tr>
      )
    }
    return rows
  }

  const createRows = war => {
    const clan = sortPlayers(war.clan.members)
    const opponent = sortPlayers(war.opponent.members)
    return playersTableRows(clan, opponent)
  }

  if (clanLeagueWar === undefined || clanLeagueWar === null) return null

  return (
    <div>
      <table className={css.CompareTable}>
        <tr>
          <th><img src={clanLeagueWar.clan.badgeUrls.small} alt={clanLeagueWar.clan.name} /><p>{clanLeagueWar.clan.name}</p> </th>
          <th><img src={clanLeagueWar.opponent.badgeUrls.small} alt={clanLeagueWar.opponent.name} /><p>{clanLeagueWar.opponent.name}</p> </th>
        </tr>
        <tbody>
          {createRows(clanLeagueWar)}
        </tbody>
      </table>
    </div>
  )
}   

export default WarMap
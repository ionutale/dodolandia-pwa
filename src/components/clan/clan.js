import React, { useState } from 'react'
import css from './clan.module.css'

const Clan = (props) => {

  const members = clanMembers => {
    const arr = clanMembers // townHallLevel
    .sort((a, b) => (a.townHallLevel > b.townHallLevel) ? -1 : ((a.townHallLevel < b.townHallLevel) ? 1 : 0))
    .map(p => {
      return (
        <li className={css.MemberInfo}>
          <p>{p.name} - <b>Th{p.townHallLevel}</b></p>
        </li>
      )
    })
    console.log(arr);
    return arr
  }

  return (
    <div className={css.ClanContainer}>
      <p>{props.clan.name}
        <b> ({props.clan.members.length})</b>
      </p>
      <img src={props.clan.badgeUrls.small} alt="clan badge"></img>
      <ul className={css.MemberList}>
        {members(props.clan.members)}
      </ul>
    </div>
  );
}

export default Clan
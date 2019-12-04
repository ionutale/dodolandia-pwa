import axios from './axios'
const CWL_API = '/api/v2/coc'


export const getClanLeague = (tag) => {
  return axios.get(`${CWL_API}/clanLeagueSync/${tag}`)
}

export const getClanLeagueWar = (tag) => {
  return axios.get(`${CWL_API}/clanLeagueWarsSync/${tag}`)
}



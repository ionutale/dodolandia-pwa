import axios from './axios'
const WORKTIME_URL = '/api/v2/coc/clanLeagueSync'


export const getClanLeague = (tag) => {
  return axios.get(`${WORKTIME_URL}/${tag}`)
}



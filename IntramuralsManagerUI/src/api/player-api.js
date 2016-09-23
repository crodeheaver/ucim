import axios from 'axios'
import store from '../store'
import { getPlayersSuccess, deletePlayerSuccess } from '../actions/player-actions'

export function getPlayers () {
  return axios.get('http://localhost:3001/players')
    .then(response => {
      store.dispatch(getPlayersSuccess(response.data))
      return response
    })
}

export function deletePlayer (playerId) {
  return axios.delete('http://localhost:3001/players/' + playerId)
    .then(response => {
      store.dispatch(deletePlayerSuccess(playerId))
      return response
    })
}

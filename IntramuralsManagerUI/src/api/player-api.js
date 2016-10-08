import axios from 'axios'
import store from '../store'
import { getPlayersSuccess, addPlayerSuccess, deletePlayerSuccess } from '../actions/player-actions'

export function getPlayers () {
  return axios.get('http://localhost:3001/api/player')
    .then(response => {
      store.dispatch(getPlayersSuccess(response.data))
      return response
    })
}

export function addPlayer (sex) {
  return axios.post('http://localhost:3001/api/player', {firstName:'', lastName:'', sex: sex === 'Men' ? 'Male' : 'Female'})
    .then(response => {
      store.dispatch(addPlayerSuccess(response.data))
      return response
    })
}

export function updatePlayers (players) {
  console.log(store)
  return axios.post('http://localhost:3001/api/player', players)
    .then(response => {
      store.dispatch(addPlayerSuccess(response.data))
      return response
    })
}

export function deletePlayer (playerId) {
  return axios.delete('http://localhost:3001/api/player/' + playerId)
    .then(response => {
      store.dispatch(deletePlayerSuccess(playerId))
      return response
    })
}

import * as types from '../actions/action-types'

export function getPlayersSuccess (players) {
  return {
    type: types.GET_PLAYERS_SUCCESS,
    players
  }
}

export function deletePlayerSuccess (playerId) {
  return {
    type: types.DELETE_PLAYER_SUCCESS,
    playerId
  }
}

import * as types from '../actions/action-types'
import _ from 'lodash'

const initialState = {
  players: []
}

const playerReducer = function (state = initialState, action) {
  switch (action.type) {

    case types.GET_PLAYERS_SUCCESS:
      return Object.assign({}, state, { players: action.players })

    case types.DELETE_PLAYER_SUCCESS:
      // Use lodash to create a new user array without the user we want to remove
      const newPlayers = _.filter(state.players, player => player.id !== action.playerId)
      return Object.assign({}, state, { players: newPlayers })
    default:
      break
  }

  return state
}

export default playerReducer

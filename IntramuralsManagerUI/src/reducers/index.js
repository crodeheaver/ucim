import { combineReducers } from 'redux'

// Reducers
import playerReducer from './player-reducer'

var reducers = combineReducers({
  playerState: playerReducer
})

export default reducers

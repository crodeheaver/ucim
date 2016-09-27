import { combineReducers } from 'redux'

// Reducers
import playerReducer from './player-reducer'
import modalReducer from './modal-reducer'
var reducers = combineReducers({
  playerState: playerReducer,
  modalState: modalReducer
})

export default reducers

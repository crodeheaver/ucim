import * as types from '../actions/action-types'

const initialState = {
  isActive: false,
  player: {firstName:'', lastName:'', sex:''}
}

const modalReducer = function (state = initialState, action) {
  console.log(action)
  switch (action.type) {
    case types.SET_MODAL_SUCCESS:
      return Object.assign({}, state, { isActive: state.isActive, player: action.player })
    case types.TOGGLE_MODAL_SUCCESS:
    console.log(state.isActive)
    console.log(!state.isActive)
      return Object.assign({}, state, { isActive: !state.isActive, player: state.player })
    default:
      break
  }

  return state
}

export default modalReducer

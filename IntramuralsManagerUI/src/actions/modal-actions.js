import * as types from '../actions/action-types'

export function setModalSuccess (player) {
  return {
    type: types.SET_MODAL_SUCCESS,
    player
  }
}

export function toggleModalSuccess () {
  return {
    type: types.TOGGLE_MODAL_SUCCESS
  }
}

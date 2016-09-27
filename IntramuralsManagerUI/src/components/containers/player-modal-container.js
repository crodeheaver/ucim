import React from 'react'
import { connect } from 'react-redux'
import store from '../../store'
import PlayerModal from '../views/player-modal'
import { toggleModalSuccess } from '../../actions/modal-actions'

const PlayerModalContainer = React.createClass({
  toggleModal()
  {
    store.dispatch(toggleModalSuccess())
  },
  render: function () {
    return (
        <PlayerModal modal={this.props.modal} toggleModal={this.toggleModal}/>
    )
  }
})

const mapStateToProps = function (store) {
  return {
    modal: store.modalState
  }
}

export default connect(mapStateToProps)(PlayerModalContainer)

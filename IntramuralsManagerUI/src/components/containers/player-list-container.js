import React from 'react'
import { connect } from 'react-redux'
import PlayerList from '../views/player-list'
import * as playerApi from '../../api/player-api'

const PlayerListContainer = React.createClass({
  componentDidMount: function () {
    playerApi.getPlayers()
  },

  render: function () {
    return (
        <PlayerList players={this.props.players} deletePlayer={playerApi.deletePlayer} />
    )
  }
})

const mapStateToProps = function (store) {
  return {
    players: store.playerState.players
  }
}


export default connect(mapStateToProps)(PlayerListContainer)

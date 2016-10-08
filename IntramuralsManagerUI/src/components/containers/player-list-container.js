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
      <div>
        <PlayerList players={this.props.players.filter(
                    function(player){
                      return player.sex === 'Male' ? true : false
                      })}
                    deletePlayer={playerApi.deletePlayer}
                    addPlayer={playerApi.addPlayer}
                    header="Men" />
        <PlayerList players={this.props.players.filter(
                    function(player){
                      return player.sex === 'Female' ? true : false
                    })}
                    deletePlayer={playerApi.deletePlayer}
                    addPlayer={playerApi.addPlayer}
                    header="Women" />
        <section className='level'>
          <div></div>
          <button className='button is-primary level-item' onClick={playerApi.updatePlayers.bind(null, this.props.players)}> Save</button>

        </section>
      </div>
    )
  }
})

const mapStateToProps = function (store) {
  return {
    players: store.playerState.players
  }
}


export default connect(mapStateToProps)(PlayerListContainer)

import React from 'react'
import { Link } from 'react-router'

// Using "Stateless Functional Components"
export default function (props) {
  return (
    <div className='data-list'>

      {props.players.map(player => {
        return (
          <div key={player.id} className='data-list-item'>
            <div className='details'>
              <Link to={'/players/' + player.id}>{player.name}</Link>
            </div>
            <div className='controls'>
              <button onClick={props.deletePlayer.bind(null, player.id)} className='delete'>Delete</button>
            </div>
          </div>
        )
      })}

    </div>
  )
}

import React from 'react'

// Using "Stateless Functional Components"
export default function (props) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th></th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th></th>
        </tr>
      </tfoot>
      <tbody>
      {props.players.map(player => {
        return (
              <tr key={player.id}>
                <td>{player.firstName} {player.lastName}</td>
                <td>{player.Sex}</td>
                <td>
                  <button onClick={props.deletePlayer.bind(null, player.id)} className='delete'></button>
                </td>
              </tr>
        )})}
    </tbody>
  </table>
)
}

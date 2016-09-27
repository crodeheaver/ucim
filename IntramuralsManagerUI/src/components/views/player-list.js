import React from 'react'

// Using "Stateless Functional Components"
export default function (props) {
  return (
    <section className='section'>
    <div className="columns">
      <div className="column is-two-thirds is-offset-2">
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
                <td>{player.sex}</td>
                <td>
                  <button onClick={props.deletePlayer.bind(null, player.id)} className='delete'></button>
                </td>
              </tr>
          )})}
          <tr>
            <td></td>
            <td>
              <span className='icon is-small'>
                <button className='button is-small fa fa-plus'></button>
              </span>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  </section>

)
}

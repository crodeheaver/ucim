import React from 'react'

// Using "Stateless Functional Components"
export default function (props) {
  return (
    <section className='section'>
    <div className="columns">
      <div className="column is-two-thirds is-offset-2">
      <section className='level'>
        <h2 className='title'>{props.header}</h2>
        <span className='icon is-small'>
          <button className='button is-small fa fa-plus' onClick={props.addPlayer.bind(null, props.header)}></button>
        </span>
      </section>

        <table className="table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Sex</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {props.players.map(player => {
              return (
                <tr key={player.id}>
                  <td><input type='text' className='text' value={player.firstName} /><input type='text' className='text' value={player.lastName} /></td>
                  <td></td>
                  <td>{player.sex}</td>
                  <td>
                    <button onClick={props.deletePlayer.bind(null, player.id)} className='delete'></button>
                  </td>
                </tr>
              )})}
          </tbody>
        </table>
      </div>
    </div>
  </section>

)
}

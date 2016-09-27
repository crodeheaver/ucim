import React from 'react'
import { Link } from 'react-router'
import PlayerModalContainer from '../containers/player-modal-container'

// Using "Stateless Functional Components"
export default function (props) {
  return (
    <div className='app'>
      <header>
        <nav className='nav'>
          <div className='nav-right nav-menu'>
            <Link to='/players' className='nav-item' activeClassName='active'>Players</Link>
            <Link to='/teams' className='nav-item' activeClassName='active'>Teams</Link>
            <Link to='/games' className='nav-item' activeClassName='active'>Games</Link>
            <Link to='/logout' className='nav-item' activeClassName='active'>Logout</Link>
          </div>
        </nav>
      </header>
      <main>
        {props.children}
      </main>
      <section>
        <PlayerModalContainer />
      </section>

    </div>
  )
}

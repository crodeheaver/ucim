import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
          <header>
            <nav className="nav">
                <div className="nav-right nav-menu">
                    <a className="nav-item" href="#">
                        Players
                    </a>
                    <a className="nav-item" href="#">
                        Teams
                    </a>
                    <a className="nav-item" href="#">
                        Games
                    </a>
                    <a className="nav-item" href="#">
                        Logout
                    </a>
                </div>
            </nav>
          </header>
      );
    }
}

export default Header

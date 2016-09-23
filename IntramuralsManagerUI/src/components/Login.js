import React, { Component } from 'react';

class Login extends Component {
    render() {
        return (
            <div className="card is-halfway">
                <div className="content">
                    <label className="label has-text-centered">Login</label>
                    <p className="control">
                        <input className="input" type="email" placeholder="Email" />
                        <i></i>
                    </p>
                    <p className="control">
                        <input className="input" type="password" placeholder="Password" />
                        <i></i>
                    </p>
                    <p className="control">
                        <button className="button is-success">
                            Login
                        </button>
                    </p>
                </div>
            </div>
      );
    }
}

export default Login

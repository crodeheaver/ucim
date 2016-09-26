import React from 'react'

export default function (props) {
        return (
        <div className="modal">
          <div className="modal-background"></div>
          <div className="modal-container">
            <div className="modal-content">
              <label className="label">First Name</label>
              <p className="control">
                <input className="input" type="text"  placeholder="First Name" />
              </p>
              <label className="label">Last Name</label>
              <p className="control">
                <input className="input" type="text" value={props.player.lastName} placeholder="Last Name" />
              </p>
              <label className="label">Sex</label>
              <p className="control">
                <input className="input" type="text" value={props.player.sex} placeholder="Sex" />
              </p>
            </div>
          </div>
          <button className="button is-primary">Save</button>
          <button className="modal-close">Cancel</button>
        </div>
      )
  }

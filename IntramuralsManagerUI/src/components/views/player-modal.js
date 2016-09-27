import React from 'react'

export default function (props) {
        return (
        <div className={props.modal.isActive ? "modal is-active" : "modal"}>
          <div className="modal-background"></div>
          <div className="modal-container">
            <div className="modal-content">
              <label className="label">First Name</label>
              <p className="control">
                <input className="input" type="text"  placeholder="First Name" />
              </p>
              <label className="label">Last Name</label>
              <p className="control">
                <input className="input" type="text" placeholder="Last Name" />
              </p>
              <label className="label">Sex</label>
              <p className="control">
                <input className="input" type="text" placeholder="Sex" />
              </p>
            </div>
          </div>
          <button className="button is-primary">Save</button>
          <button onClick={props.toggleModal.bind(null, props.modal.player)} className="modal-close" >Cancel</button>
        </div>
      )
  }

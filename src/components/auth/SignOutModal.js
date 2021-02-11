import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";


import "../../scss/main.css";
import { signOut } from "../../actions/authActions";

const SignOutModal = props => {
    return ReactDOM.createPortal(
        <div className="modal fade" id="signOutModal" tabindex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="signOutModalLabel">Sign Out</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <p className="text-muted">Are you sure you want to sign out?</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onSubmit={props.signOut}>Sign Out</button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>,
        document.querySelector('#modal')
    )
}

//<button className= "btn btn-lg btn-primary btn-block mb-4" onSubmit={props.signOut}>Log Out</button>

const mapDispatchToProps = (dispatch) => {
  return { signOut: () => dispatch(signOut()) };
};

export default connect(null, mapDispatchToProps)(SignOutModal);
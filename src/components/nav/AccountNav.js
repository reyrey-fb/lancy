import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "../../scss/main.css";
import { signOut } from "../../actions/authActions";

class AccountNav extends Component {
  render() {
    return (
      <div className="container m-0 p-0">
        <ul className="navbar flex-column bg-nav min-vh-100 d-inline-flex border border-navborder">
          <li className="nav-item row">
            <Link className="nav-link" to="/account/profile">
              <img
                src={require("../../assets/icons/profile.svg")}
                alt="Lancy"
                width="10"
                height="10"
              />
            </Link>
          </li>
          <div>
            <li className="nav-item row">
              <Link className="nav-link " to="/account">
                <img
                  src={require("../../assets/icons/account.svg")}
                  alt="Home"
                  width="10"
                  height="10"
                />
              </Link>
            </li>
            <li className="nav-item row">
              <Link className="nav-link" to="/account/billing">
                <img
                  src={require("../../assets/icons/billing.svg")}
                  alt="Favorites"
                  width="10"
                  height="10"
                />
              </Link>
            </li>
          </div>
          <div className="row align-items-end">
            <li className="nav-item row">
              <Link className="nav-link" onClick={this.props.signOut} to="/">
                <img
                  src={require("../../assets/icons/logout.svg")}
                  alt="Account"
                  width="10"
                  height="10"
                />
              </Link>
            </li>
          </div>
        </ul>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return { signOut: () => dispatch(signOut()) };
};

export default connect(null, mapDispatchToProps)(AccountNav);

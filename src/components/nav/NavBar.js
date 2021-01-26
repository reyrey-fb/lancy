import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import "../../scss/main.css";


class NavBar extends Component {
    
    render () {
        const { profile } = this.props;
        console.log(profile);
        return (
          <div className="sidebar-sticky">
            <ul className="navbar flex-column bg-light min-vh-100 d-inline-flex mb-0">
              <li className="nav-item row align-items-start">
                <Link className="nav-link" to="/">
                  <img
                    src={require("../../assets/images/Logo.svg")}
                    alt="Lancy"
                    width="30"
                    height="30"
                  />
                </Link>
              </li>
              <div>
                <li className="nav-item row align-items-center">
                  <Link className="nav-link " to="/">
                    <img
                      src={require("../../assets/icons/home.svg")}
                      alt="Home"
                      width="20"
                      height="20"
                    />
                  </Link>
                </li>               
              </div>
              <li className="nav-item row align-items-end">
                <Link className="nav-link" to="/account/profile">
                  <span className=" rounded-circle bg-primary text-white p-2">
                    {profile.initials}
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        );
    }
}

const mapStateToProps = state => {
    return {
         profile: state.firebase.profile
    }  
}

export default connect (mapStateToProps) (NavBar);


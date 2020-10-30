import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "../../scss/main.css";


class NavBar extends Component {
    render () {
        return (
          <React.Fragment className="container">  
              <ul className="navbar flex-column bg-light min-vh-100 d-inline-flex">
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
                        width="10"
                        height="10"
                      />
                    </Link>
                  </li>
                  <li className="nav-item row align-items-center">
                    <Link className="nav-link" to="/">
                      <img
                        src={require("../../assets/icons/faves_empty.svg")}
                        alt="Favorites"
                        width="10"
                        height="10"
                      />
                    </Link>
                  </li>
                </div>
                <div className="row align-items-end">
                  <li className="nav-item row align-items-end">
                    <Link className="nav-link" to="/account">
                      <img
                        src={require("../../assets/images/profile.svg")}
                        alt="Settings"
                        width="30"
                        height="30"
                      />
                    </Link>
                  </li>
                </div>
              </ul>         
          </React.Fragment>
        );
    }
}

export default NavBar;


import React, { Component } from "react";
import NavBar from "../nav/NavBar";
import "../../scss/main.css";

class Account extends Component {
  render() {
    return (
      <div className="container-fluid m-0 p-0">
        <div className="row">
          <div className="col-auto">
              <NavBar />
          </div>
          <div className="col-auto ml-auto m-2">
            <button className="btn btn-primary ">Logout</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Account;

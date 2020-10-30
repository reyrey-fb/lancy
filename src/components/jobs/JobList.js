import React, { Component } from 'react';
import NavBar from '../nav/NavBar';
import "../../scss/main.css";

class JobList extends Component {
    render () {
        return (
          <div className="container-fluid m-0 p-0">
            <div className="row">
                <div className="col-auto">
                <NavBar />
                </div>
                <div className="col-auto">JobList</div> 
            </div>
          </div>
        );
    }
}

export default JobList;
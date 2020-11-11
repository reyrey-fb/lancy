import React, { Component } from "react";
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import NavBar from "../nav/NavBar";
import "../../scss/main.css";

class SavedJobsList extends Component {
  render() {
      const { auth } = this.props;
      if (!auth.uid) { 
        return <Redirect to="/signin"/> 
      }
    return (
      <div className="container-fluid m-0 p-0">
        <div className="row">
          <div className="col-auto">
            <NavBar />
          </div>
          <div className="col-auto"> Saved Job List</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      auth: state.firebase.auth,
    }
}

export default connect(mapStateToProps) (SavedJobsList);

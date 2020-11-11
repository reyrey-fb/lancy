import React from "react";
import { Redirect } from "react-router-dom";

import "../../scss/main.css";
import { connect } from "react-redux";
import NavBar from "../nav/NavBar";
import AccountNav from "../nav/AccountNav";

const Account = (props) => {
  const { auth } = props;
  if (!auth.uid) {
    return <Redirect to="/signin" />;
  }

  return (
    <div className="container-fluid m-0 p-0">
      <div className="row">
        <div className="col-auto">
          <NavBar />
        </div>
        <div className="col-auto">
          <AccountNav />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(Account);

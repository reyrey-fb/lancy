import React from 'react';
import { connect } from 'react-redux';

import NavBar from '../nav/NavBar';
import SearchBar from './SearchBar';
import DropDown from './DropDown';

import "../../scss/main.css";


const JobList = (props) => {

  const handleSearchSubmit = (term) => {
    //call API action creator here
    console.log(term);
  }

  return (
    <div className="container-fluid m-0 p-0">
      <div className="row">
        <div className="col-auto">
          <NavBar />
        </div>
        <div className="mt-4 d-inline-flex">
          <div className="col-6 ml-lg-5">
            <SearchBar onSubmit={handleSearchSubmit(props.searchTerm)} />
          </div>
          <div className="col">
            <DropDown />
          </div>
        </div>
      </div>
    </div>
  ); 
} 

const mapStateToProps = state => {
  return {
    searchTerm: state.search.value
  }
}

export default connect(mapStateToProps) (JobList);
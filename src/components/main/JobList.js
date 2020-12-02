import React from 'react';
import { connect } from 'react-redux';

import NavBar from '../nav/NavBar';
import SearchBar from './SearchBar';
import DropDown from './DropDown';
import Slider from './Slider';

import "../../scss/main.css";


const JobList = (props) => {

  const handleSearchSubmit = (term) => {
    //call API action creator here
    console.log(term);
  }

  //render checkbox items for dropdowns
  const checkbox = (
    <div className="form-check">
      <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
      <label className="form-check-label" htmlFor="defaultCheck1">
      Under a week
      </label>
    </div>
  );

  const hourlySlider = (
    <div className="">
      <Slider
        label="Hourly"
        slots="120"
        step="5"
        start="35"
        end="55"
      />
    </div>
  );

    const priceSlider = (
      <div className="">
        <Slider label="Fixed Price" slots="120" step="5" start="35" end="55" />
      </div>
    );

  return (
    <div className="container-fluid">
      <div className="row">
        <nav className="col-auto p-0">
          <NavBar />
        </nav>
        <main role="main" className="col mt-4">
          <div className="row no-gutters d-flex justify-content-around">
            <div className="col-md-9 col-6">
              <SearchBar
                id="search"
                onSubmit={handleSearchSubmit(props.searchTerm)}
              />
            </div>
            <div className="col-md-3 col-6">
              <DropDown
                id="sortBy"
                search="none"
                title="Most Relevant"
                itemOne="Most Recent"
                itemTwo="Highest Pay"
              />
            </div>
          </div>

          <div className="row no-gutters d-flex justify-content-around">
            <div className="col-lg-2 col-md-4 col-6 pr-0 mt-3">
              <DropDown
                id="filter"
                search="none"
                title="Date Posted"
                itemOne="Today"
                itemTwo="1-3 Days"
                itemThree="1-7 Days"
              />
            </div>
            <div className="col-lg-2 col-md-4 col-6 pr-0 mt-3">
              <DropDown
                id="filter"
                search="none"
                title="Job Type"
                itemOne="Hourly"
                itemTwo="Fixed Price"
              />
            </div>
            <div className="col-lg-2 col-md-4 col-6 pr-0 mt-3">
              <DropDown
                id="filter"
                search="block"
                title="Category"
                itemOne={checkbox}
                itemTwo={checkbox}
                itemThree={checkbox}
              />
            </div>
            <div className="col-lg-2 col-md-4 col-6 pr-0 mt-3">
              <DropDown
                id="filter"
                search="none"
                title="Duration"
                itemOne={checkbox}
                itemTwo={checkbox}
                itemThree={checkbox}
              />
            </div>
            <div className="col-lg-2 col-md-4 col-6 pr-0 mt-3">
              <DropDown
                id="filter"
                type="slider"
                search="none"
                title="Salary"
                itemOne={hourlySlider}
                itemTwo={priceSlider}
              />
            </div>
            <div className="col-lg-2 col-md-4 col-6 pr-0 mt-3">
              <DropDown
                id="filter"
                search="block"
                title="Location"
                itemOne={checkbox}
                itemTwo={checkbox}
                itemThree={checkbox}
              />
            </div>
          </div>

          <div className="row">
            <div className="col mt-3">I'm a new row! Test me!</div>
          </div>
        </main>
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
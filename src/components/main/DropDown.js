import React from "react";

import SearchBar from './SearchBar';
import "../../scss/main.css";
import "../../scss/lancy.css";

const DropDown = (props) => {

  //conditionally rendered label
  const label = () => {
      if (props.id ==="sortBy") {
          return (
            <label className="d-block col-form-label-sm text-label mb-0 pb-0">
              Sort By
            </label>
          );
      }    
};
  //conditional rendering for slider
  let type = (props.type==="slider") ? "slider" : "";
  let sliderItem = (props.type==="slider") ? "slider-item" : "";

  return (
    <div className="container" id={props.id}>
      {label()}
      <div className="dropdown btn-group border rounded-sm position-relative">
        <button
          type="button"
          className="btn btn-white text-left dropdown-icon"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {props.title}
        </button>
        <div
          className={`dropdown-menu ${type}`}
          aria-labelledby="dropdownMenuButton"
        >
          <div className={`d-${props.search}`}>
            <SearchBar />
          </div>
          <div className={`dropdown-item ${sliderItem}`}>{props.itemOne}</div>
          <div className={`dropdown-item ${sliderItem}`}>{props.itemTwo}</div>
          <div className={`dropdown-item ${sliderItem}`}>{props.itemThree}</div>
        </div>
      </div>
    </div>
  );
}

export default DropDown;

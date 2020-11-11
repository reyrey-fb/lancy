import React from "react";

import "../../scss/main.css";
import "../../scss/lancy.css";

const DropDown = () => {
    return (
      <div>
        <label className="d-block col-form-label-sm text-label position-relative">
          Sort By
        </label>
        <div className="btn-group border rounded-sm py-1 px-1">
          <button type="button" className="btn btn-white">
            Most Relevant
          </button>
          <button
            type="button"
            className="btn btn-white dropdown-toggle dropdown-toggle-split"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="sr-only">Toggle Dropdown</span>
          </button>
          <div className="dropdown-menu">
            <span className="dropdown-item text-dropdown">Most Recent</span>
            <span className="dropdown-item text-dropdown">Highest pay</span>
          </div>
        </div>
      </div>
    );
}

export default DropDown;

import React from "react";
import { connect } from "react-redux";

import SearchBar from './SearchBar';
import "../../scss/main.css";
import "../../scss/lancy.css";
import { selectDropdownItem } from "../../actions/dropdownActions";

const DropDown = (props) => {
  const {items} = props;

  //Dropdown item click event handler
  const onClick = (item) => {
    //call dropdown action creator
    props.selectDropdownItem(item);
    console.log(`${item} selected from dropdown menu`);

    //variables for date filter calculations
    const oneDay = 24 * 60 * 60 * 1000; //hours*minutes*seconds*milliseconds
    let today = new Date();

    //Dropdown filter match logic
    props.customUpworkFeed.map((jobItem, i) => {

      const dateJobPosted = new Date(jobItem.datePosted);
      const daysSinceJobPosted = Math.round(Math.abs((today - dateJobPosted) / oneDay));

      //datePosted filter
      if ( item === "Today" && daysSinceJobPosted <= 1 ) {
        console.log(`job at ${i} was posted today`)
      } else if ( item === "1-3 Days" && daysSinceJobPosted <= 3 ) {
        console.log(`job at ${i} was posted in the last 3 days`)
      } else if ( item === "1-7 Days" && daysSinceJobPosted <= 7 ) {
        console.log(`job at ${i} was posted in the last 7 days`)
      }

      //job type filter
      if (jobItem.hourlyRange.jobType === item) {
        console.log(`user selected a job type match at index ${i}`)
      } else if (jobItem.fixedPrice.jobType === item) {
        console.log(`user selected a job type match at index ${i}`)
      }

      //category filter
      if (jobItem.category === item) {
        console.log(`user selected a category match at index ${i}`)
      }

      //skills filter
      jobItem.skills.map((skill) => {
        if ( skill === item) {
          console.log(`user selected a skill match at index ${i}`)
        }
      })

      //slider filter match logic is in Slider component event handler
      
      //location filter
      if (jobItem.location === item) {
        console.log(`user selected a location match at index ${i}`)
      }
    
    })
    
  };

  //dynamically render dropdown menu items
  const renderItems = items.map((item) => {

    //conditional styling for slider and checkbox items
    let subtype = (props.subtype === "slider" || props.subtype === "checkbox") ? "slider" : "";
    let sliderItem = (props.subtype === "slider" || props.subtype === "checkbox") ? "slider-item" : "";

    //dynamic rendering of dropdown item options
    const renderOptions = item.option.map((option,i) => {
        if (props.subtype === "checkbox") {
          return (
            <li
              key={i}
              onClick={() => onClick(option)}
              className={`dropdown-item ${sliderItem}`}
            >
              <div
                className="form-check"
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={option}
                  id="defaultCheck1"
                />
                <label className="form-check-label" htmlFor="defaultCheck1">
                  {option}
                </label>
              </div>
            </li>
          );
        } else if (props.subtype === "slider") {
            return (
              <React.Fragment>
                <li
                  key={i}
                  onClick={() => onClick(option)}
                  className={`dropdown-item ${sliderItem}`}
                >
                  {props.sliderOne}
                </li>

                <li
                  key={i}
                  onClick={() => onClick(option)}
                  className={`dropdown-item ${sliderItem}`}
                >
                  {props.sliderTwo}
                </li>
              </React.Fragment>
          );
        } else {
            return (
              <li
                key={i}
                onClick={() => onClick(option)}
                className={`dropdown-item ${sliderItem}`}
              >
                {option}
              </li>
            )
        }
    });

    if (item.title === props.title) {
          let searchName =
            props.title === "Skills"
              ? "filterBySkillsSearch"
              : "filterByCategorySearch";
          return (
            <div className="dropdown btn-group border rounded-sm position-relative">
              <button
                type="button"
                className="btn btn-white text-left dropdown-icon"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {item.title}
              </button>
              <ol
                className={`dropdown-menu ${subtype}`}
                aria-labelledby="dropdownMenuButton"
              >
                <div className={`d-${props.search}`}>
                  <SearchBar name={searchName} />
                </div>
                {renderOptions}
              </ol>
            </div>
          );
    } else {
      return null;
    }
  });

  //conditionally rendered label
  const label = () => {
    if (props.id === "sortBy") {
      return (
        <label className="d-block col-form-label-sm text-label mb-0 pb-0">
          Sort By
        </label>
      );
    }
  };

  return (
    <div className="container" id={props.id}>
      {label()}
      {renderItems}
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  //creating local instances of the slider component state in redux store
  let name = ownProps.name;
  let localState = state[name];
  return {
    name: name,
    item: localState.item,
    customUpworkFeed: state.customUpworkFeed.data
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    selectDropdownItem: (item) => dispatch(selectDropdownItem(ownProps.name, item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (DropDown);

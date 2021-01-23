import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectMinValue, selectMaxValue } from "../../actions/sliderActions";

import "../../scss/slider.css";

class Slider extends Component {
        
  //Drag and drop event handlers
  //Prevent continuous firings of event handler while object is being dragged
  onDragOver = (e) => {
    e.preventDefault();
  };

  //define which slider (min or max) is being dragged
  //this pushes "data-slider=min and/or max" to the target element
  onDragStart = (e) => {
    let slider = e.target.dataset.slider; //value is min or max
    this.sliderType = slider; //instance variable to store min or max value
  };

  //capture where on the scale the slider is being dropped
  //grab thumb source (min or max) -> get the slot (where drop happens) -> validate -> update the slot state -> reset sliderType
  onDrop = (e) => {
    let source = this.sliderType; //min or max
    let slot = Number(e.target.dataset.slot); //sets data-slot=number

    if (isNaN(slot)) return;

    if (source === "min") {
      if (slot >= this.props.end) return;
      this.props.selectMinValue(slot); //call action creator
    } else if (source === "max") {
      if (slot <= this.props.start) return;
      this.props.selectMaxValue(slot); //call action creator
    }
    this.sliderType = null; //reset min/max sliderType
  };

   //***SLIDER FILTER MATCH LOGIC - RETURN CONDITIONAL JOB LISTS BASED ON USER SLIDER SELECTION***//
  filterArrays = () => {
    //salary filter arrays (2)
    //hourly price filter
    const salaryHourlyFilterJobsArray = this.props.customUpworkFeed.filter ((jobItem, i) => {
      if ( jobItem.hourlyRange.jobType === "Hourly" && this.props.start <= jobItem.hourlyRange.highPrice) {
        console.log(`user selected hourly price of $${this.props.start}-$${this.props.end}. $${jobItem.hourlyRange.lowPrice}-${jobItem.hourlyRange.highPrice} at index ${i} falls within the price range`)
        return jobItem;
      }
    })
    if (salaryHourlyFilterJobsArray.length) {console.log(salaryHourlyFilterJobsArray);}
    //fixed price filter
    const salaryFixedPriceFilterJobsArray = this.props.customUpworkFeed.filter ((jobItem, i) => {
      if ( jobItem.fixedPrice.jobType === "Fixed Price" && this.props.start <= jobItem.fixedPrice.price && this.props.end >= jobItem.fixedPrice.price ) {
        console.log(`user selected a desired fixed price of $${this.props.start}-$${this.props.end}. $${jobItem.fixedPrice.price} at index ${i} falls within this range`)
        return jobItem;
      }
    })
    if (salaryFixedPriceFilterJobsArray.length) {console.log(salaryFixedPriceFilterJobsArray);}
  }

  //JSX for rendering the thumbs for the slider start
  MinSlider = () => {
    return (
      <div
        data-slider="min"
        onDragStart={this.onDragStart}
        onTouchStart={this.onDragStart}
        onDrag={this.onDrag}
        draggable
        className="slider-thumb slider-thumb-min"
      ></div>
    );
  };

  //JSX for rendering the thumbs for the slider end
  MaxSlider = () => {
    return (
      <div
        data-slider="max"
        onDragStart={this.onDragStart}
        onTouchStart={this.onDragStart}
        onDrag={this.onDrag}
        draggable
        className="slider-thumb slider-thumb-max"
      ></div>
    );
  };

  render() {
    let slider = [];
    let currentScale = [];
    let minThumb = null;
    let maxThumb = null;

    //format thousands into 'k': $1,200 -> $1.2k
    const kFormatter = (num) => {
      return "$" + Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
    };

    //currency format converter
    const currencyFormat = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    });

    //for loop through the slider scale
    for (let i = 0; i <= this.props.slots; i += this.props.step) {
      //find the user-selected start-end tooltip label value
      let currentLabel = "";

      if (i === this.props.start || i === this.props.end) {
        currentLabel =
          Math.abs(i) > 999
            ? kFormatter(i) //format thousands in to $1.2K
            : currencyFormat.format(i); //format under thousands into normal currency: $55
      }

      currentScale.push(
        <div key={i} className="slot-scale">
          {currentLabel}
        </div>
      );

      //sync the Slider thumb with the start/end label value
      if (i === this.props.start) {
        minThumb = <this.MinSlider />;
      } else if (i === this.props.end) {
        maxThumb = <this.MaxSlider />;
      } else {
        minThumb = null;
        maxThumb = null;
      }

      //JSX for the slider itself
      let lineClass = "line";

      if (i > this.props.start && i < this.props.end) {
        lineClass += " line-selected";
      }

      slider.push(
        <div
          data-slot={i}
          onDragOver={this.onDragOver}
          onTouchMove={this.onDragOver}
          onTouchEnd={this.onDrop}
          onDrop={this.onDrop}
          key={i}
          className="slot"
        >
          <div data-slot={i} className={lineClass} />
          {minThumb}
          {maxThumb}
        </div>
      );
    }
    console.log(this.props);
    this.filterArrays();

    return (
      <div className="container p-0">
        <div className="row">
          <div className="col-auto">
            <label>{this.props.label}</label>
            <div className="slider-container">
              <div className="slider">{slider}</div>
              <div className="slider-selected-scale">{currentScale}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
}

const mapStateToProps = (state, ownProps) => {
    //creating local instances of the slider component state in redux store
    let name = ownProps.name;
    let localState = state[name];
    return {
      name: name,
      slots: localState.slots,
      step: localState.step,
      start: localState.start,
      end: localState.end,
      customUpworkFeed: state.customUpworkFeed.data
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    selectMinValue: value => dispatch(selectMinValue(ownProps.name, value)),
    selectMaxValue: value => dispatch(selectMaxValue(ownProps.name, value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps) (Slider);
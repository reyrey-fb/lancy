import React, { Component } from "react";
import { connect } from "react-redux";
import parse from "html-react-parser";

import { fetchUpworkRSSFeed } from "../../actions/feedActions";
import { catchErrors } from "../../actions/errorActions";
import { getFilterData } from "../../actions/filterDataActions";
import useFilterDataFromRSS from "../../rss/ExtractFilterDataFromRSS";
import { customJobItemsList } from "../../rss/ExtractFilterDataFromRSS";
import FilterConditionalRender from "../filter/FilterConditionalRender";

class JobItems extends Component {

    componentDidMount() {
      //fetch, parse and catch jobs data
      const dataFromRSS = this.props.fetchUpworkRSSFeed();
      dataFromRSS.then( 
        useFilterDataFromRSS()) // call business logic function that parses RSS text data
        .then(
        this.props.getFilterData(customJobItemsList) //action creator passes parsed RSS data to redux store
        ).catch(() => this.props.catchErrors(true));

      new Promise(function(resolve, reject){
        setTimeout(() => resolve(1), 1000);
      }).then(function(result) {
        console.log(result);
        return result * 2;
      }).then((result) => {
        console.log(result);
        return result * 2;
      })
      
      
    }

    renderCustomData () { //INDEXING INTO THIS ARRAY RETURNS UNDEFINED, PROBABLY DUE TO ASYNC PROBLEMS
          return (
            <React.Fragment>
            {this.props.customUpworkFeed && this.props.customUpworkFeed.map((item, i) => (
              <div key = {i}>
                <p>I AM IN A LOOP</p>
                <p>{item.hourlyRange.lowPrice}</p>
                <p>{item.category}</p>
                <p>{item.skills}</p>
              </div>
            ))}
            </React.Fragment>
          )
        }

    renderSelectedFilter (item, sliderStart, sliderEnd) {
      
      //default page load display, if no filter item is selected
      if (!item && !sliderStart && !sliderEnd) {
        return (
          <div>
            {this.props.upworkFeed.items &&
              this.props.upworkFeed.items.map((item, i) => (
                <div key={i}>
                  <h1>{item.title}</h1>
                  <p>{parse(item.content)}</p>
                </div>
              ))}
              </div>
        )
      } 
  
//***DROPDOWN FILTER MATCH LOGIC - RETURN CONDITIONAL JOB LISTS BASED ON USER DROPDOWN SELECTION***//
      let filterArray;
    //datePosted filter arrays (3)
      //variables for date filter calculations
      const oneDay = 24 * 60 * 60 * 1000; //hours*minutes*seconds*milliseconds
      let today = new Date();
    //filter: job posted today
    const datePostedFilterTodayJobsArray = this.props.customUpworkFeed.filter ( (jobItem, i) => {
      const dateJobPosted = new Date(jobItem.datePosted);
      const daysSinceJobPosted = Math.round(Math.abs((today - dateJobPosted) / oneDay));
      if ( item === "Today" && daysSinceJobPosted <= 1 ) {
        console.log(`job at ${i} was posted today`)
        return jobItem; //[{jobItem}, {}, {}]
      }
    })
     if (datePostedFilterTodayJobsArray.length) {
      filterArray = datePostedFilterTodayJobsArray;
     }
    //filter: job posted in the last 3 days
    const datePostedFilter3DaysJobsArray = this.props.customUpworkFeed.filter ( (jobItem, i) => {
      const dateJobPosted = new Date(jobItem.datePosted);
      const daysSinceJobPosted = Math.round(Math.abs((today - dateJobPosted) / oneDay));
      if ( item === "1-3 Days" && daysSinceJobPosted <= 3 ) {
        console.log(`job at ${i} was posted in the last 3 days`)
        return jobItem; //[{jobItem}, {}, {}]
      }
    })
    if (datePostedFilter3DaysJobsArray.length) {
      filterArray = datePostedFilter3DaysJobsArray;
    }
    //filter: job posted in the last 7 days
    const datePostedFilter7DaysJobsArray = this.props.customUpworkFeed.filter ( (jobItem, i) => {
      const dateJobPosted = new Date(jobItem.datePosted);
      const daysSinceJobPosted = Math.round(Math.abs((today - dateJobPosted) / oneDay));
      if ( item === "1-7 Days" && daysSinceJobPosted <= 7 ) {
        console.log(`job at ${i} was posted in the last 7 days`)
        return jobItem; //[{jobItem}, {}, {}]
      }
    })
    if (datePostedFilter7DaysJobsArray.length) {
      filterArray = datePostedFilter7DaysJobsArray;
    }

    //job type filter arrays (2)
    //filter: hourly job type
    const jobTypeFilterHourlyJobsArray = this.props.customUpworkFeed.filter ( (jobItem, i) => {
      if (jobItem.hourlyRange.jobType === item) {
        console.log(`user selected a job type match of hourly at index ${i}`)
        return jobItem; //[{jobItem}, {}, {}]
      }
    })
    if (jobTypeFilterHourlyJobsArray.length) {
      filterArray = jobTypeFilterHourlyJobsArray;
    }
    //filter: fixed price job type
    const jobTypeFilterFixedPriceJobsArray = this.props.customUpworkFeed.filter ( (jobItem, i) => {
      if (jobItem.fixedPrice.jobType === item) {
        console.log(`user selected a fixed price job type match of fixed price at index ${i}`)
        return jobItem; //[{jobItem}, {}, {}]
      }
    })
    if (jobTypeFilterFixedPriceJobsArray.length) {
      filterArray = jobTypeFilterFixedPriceJobsArray;
    }

    //category filter
    const categoryFilterJobsArray = this.props.customUpworkFeed.filter( (jobItem, i) => {
        if (jobItem.category === item) {
          console.log(`user selected a category match at index ${i}`)
          return jobItem; //[{jobItem}, {}, {}]
      }
    })
    if (categoryFilterJobsArray.length) {
      filterArray = categoryFilterJobsArray;
    }

    //skills filter
    let skillsFilterJobsArray = [];
    this.props.customUpworkFeed.map( (jobItem, i) => {
      jobItem.skills.map((skill) => {
        if ( skill === item ) {
          console.log(`user selected a skill ${skill} which matches at index ${i}`)
          skillsFilterJobsArray.push(jobItem); //[{jobItem}, {}, {}]
        }
      })
    })
    if (skillsFilterJobsArray.length) {
      filterArray = skillsFilterJobsArray;
    }
    
    //Salary Slider filter match logic is in Slider component event handler
    //salary filter arrays (2)
    //hourly price filter
    const salaryHourlyFilterJobsArray = this.props.customUpworkFeed.filter ((jobItem, i) => {
      if ( !item && jobItem.hourlyRange.jobType === "Hourly" && sliderStart <= jobItem.hourlyRange.highPrice) {
        console.log(`user selected hourly price of $${sliderStart}-$${sliderEnd}. $${jobItem.hourlyRange.lowPrice}-${jobItem.hourlyRange.highPrice} at index ${i} falls within the price range`)
        return jobItem;
      }
    })
    if (salaryHourlyFilterJobsArray.length) {
      filterArray = salaryHourlyFilterJobsArray;
    }
    //fixed price filter
    const salaryFixedPriceFilterJobsArray = this.props.customUpworkFeed.filter ((jobItem, i) => {
      if ( jobItem.fixedPrice.jobType === "Fixed Price" && sliderStart <= jobItem.fixedPrice.price && sliderEnd >= jobItem.fixedPrice.price ) {
        console.log(`user selected a desired fixed price of $${sliderStart}-$${sliderEnd}. $${jobItem.fixedPrice.price} at index ${i} falls within this range`)
        return jobItem;
      }
    })
    if (salaryFixedPriceFilterJobsArray.length) {
      filterArray = salaryFixedPriceFilterJobsArray;
    }

    //location filter
    const locationFilterJobsArray = this.props.customUpworkFeed.filter( (jobItem, i) => {
      if (jobItem.location === item) {
        console.log(`user selected a location match at index ${i}`);
        return jobItem; //[{jobItem}, {}, {}]
      }
    })
    if (locationFilterJobsArray.length) {
      filterArray = locationFilterJobsArray;
    }

      //conditional filter render
      return <FilterConditionalRender
                name = {this.props.filterName} //this works
                filterArray = {filterArray}
                selectedOption = {item}
            />

    }

    render() {
      console.log(this.props.customUpworkFeed);
      const test = customJobItemsList[0]; //UNDEFINED

        //show loading and catch errors
        if (this.props.upworkFeed.length === 0 && this.props.error === false) {
          return <div>Loading...</div>
        }
        if (this.props.error === true) {
          return <div>There was an error fetching your jobs data.</div>
        }

        return (
          <div>
            {this.renderSelectedFilter(this.props.filterItem, this.props.sliderStart, this.props.sliderEnd)}
          </div>
        );
    }
}

const mapStateToProps = (state) => {

   //dynamically generate the name of each filter name selected
   let dynamicFilterName = "filterBySalary"; //default filter name, to prevent undefined error
    if (state.filterByDate.name.length ) {
      dynamicFilterName = state.filterByDate.name;
    }
    if (state.filterByJobType.name.length ) {
      dynamicFilterName = state.filterByJobType.name;
    }
    if (state.filterByCategory.name.length ) {
      dynamicFilterName = state.filterByCategory.name;
    }
    if (state.filterBySkills.name.length ) {
      dynamicFilterName = state.filterBySkills.name;
    }
    if (state.hourlySlider.name.length ) {
      dynamicFilterName = state.hourlySlider.name; //this works : "hourlySlider"
    }
    if (state.priceSlider.name.length ) {
      dynamicFilterName = state.priceSlider.name; // this works : "priceSlider"
    }
    if (state.filterByLocation.name.length ) {
      dynamicFilterName = state.filterByLocation.name;
    }

    return {
        filterName: state[dynamicFilterName].name,
        upworkFeed: state.upworkFeed.feed, // raw upwork feed, needed for first default load
        error: state.errorInJobItems.error,
        customUpworkFeed: state.customUpworkFeed.data, //parsed data upwork feed
        filterItem: state[dynamicFilterName].item, //filter term selected from dropdown by user
        sliderStart: state[dynamicFilterName].start, //slider start value
        sliderEnd: state[dynamicFilterName].end //slider end value
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchUpworkRSSFeed : () => dispatch(fetchUpworkRSSFeed()),
        catchErrors : (error) => dispatch(catchErrors(ownProps.name, error)),
        getFilterData: ( data ) => dispatch (getFilterData(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (JobItems);


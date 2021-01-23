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

    renderSelectedFilter (item) {
      //default page load display, if no filter item is selected
      if (!item) {
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
     if (datePostedFilterTodayJobsArray.length) {console.log(datePostedFilterTodayJobsArray);}
    //filter: job posted in the last 3 days
    const datePostedFilter3DaysJobsArray = this.props.customUpworkFeed.filter ( (jobItem, i) => {
      const dateJobPosted = new Date(jobItem.datePosted);
      const daysSinceJobPosted = Math.round(Math.abs((today - dateJobPosted) / oneDay));
      if ( item === "1-3 Days" && daysSinceJobPosted <= 3 ) {
        console.log(`job at ${i} was posted in the last 3 days`)
        return jobItem; //[{jobItem}, {}, {}]
      }
    })
    if (datePostedFilter3DaysJobsArray.length) {console.log(datePostedFilter3DaysJobsArray);}
    //filter: job posted in the last 7 days
    const datePostedFilter7DaysJobsArray = this.props.customUpworkFeed.filter ( (jobItem, i) => {
      const dateJobPosted = new Date(jobItem.datePosted);
      const daysSinceJobPosted = Math.round(Math.abs((today - dateJobPosted) / oneDay));
      if ( item === "1-7 Days" && daysSinceJobPosted <= 7 ) {
        console.log(`job at ${i} was posted in the last 7 days`)
        return jobItem; //[{jobItem}, {}, {}]
      }
    })
    if (datePostedFilter7DaysJobsArray.length) {console.log(datePostedFilter7DaysJobsArray);}

    //job type filter arrays (2)
    //filter: hourly job type
    const jobTypeFilterHourlyJobsArray = this.props.customUpworkFeed.filter ( (jobItem, i) => {
      if (jobItem.hourlyRange.jobType === item) {
        console.log(`user selected a job type match of hourly at index ${i}`)
        return jobItem; //[{jobItem}, {}, {}]
      }
    })
    if (jobTypeFilterHourlyJobsArray.length) {console.log(jobTypeFilterHourlyJobsArray);}
    //filter: fixed price job type
    const jobTypeFilterFixedPriceJobsArray = this.props.customUpworkFeed.filter ( (jobItem, i) => {
      if (jobItem.fixedPrice.jobType === item) {
        console.log(`user selected a fixed price job type match of hourly at index ${i}`)
        return jobItem; //[{jobItem}, {}, {}]
      }
    })
    if (jobTypeFilterFixedPriceJobsArray.length) {console.log(jobTypeFilterFixedPriceJobsArray);}

    //category filter
    const categoryFilterJobsArray = this.props.customUpworkFeed.filter( (jobItem, i) => {
        if (jobItem.category === item) {
          console.log(`user selected a category match at index ${i}`)
          return jobItem; //[{jobItem}, {}, {}]
      }
    })
    if (categoryFilterJobsArray.length) {console.log(categoryFilterJobsArray);}

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
    if (skillsFilterJobsArray.length) {console.log(skillsFilterJobsArray);}
    
    //Salary Slider filter match logic is in Slider component event handler

    //location filter
    const locationFilterJobsArray = this.props.customUpworkFeed.filter( (jobItem, i) => {
      if (jobItem.location === item) {
        console.log(`user selected a location match at index ${i}`);
        return jobItem; //[{jobItem}, {}, {}]
      }
    })
    if (locationFilterJobsArray.length) {console.log(locationFilterJobsArray);}

    console.log(item); //the category item selected, not the filter category itself
    
      return <FilterConditionalRender
                name = "filterByJobType"
                filterArray = {jobTypeFilterFixedPriceJobsArray}
                selectedOption = {item}
            />

    }

    render() {
      console.log(this.props.customUpworkFeed);
      const test = customJobItemsList[0]; //UNDEFINED
      console.log(test)

        //show loading and catch errors
        if (this.props.upworkFeed.length === 0 && this.props.error === false) {
          return <div>Loading...</div>
        }
        if (this.props.error === true) {
          return <div>There was an error fetching your jobs data.</div>
        }

        return (
          <div>
            {this.renderSelectedFilter(this.props.item)}
          </div>
        );
    }
}

const mapStateToProps = state => {
    
    return {
        upworkFeed: state.upworkFeed.feed, 
        error: state.errorInJobItems.error,
        customUpworkFeed: state.customUpworkFeed.data,
        item: state["filterByJobType"].item,
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


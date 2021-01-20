import React, { Component } from "react";
import { connect } from "react-redux";
import parse from "html-react-parser";

import { fetchUpworkRSSFeed } from "../../actions/feedActions";
import { catchErrors } from "../../actions/errorActions";
import { getFilterData } from "../../actions/filterDataActions";
import useFilterDataFromRSS from "../../rss/ExtractFilterDataFromRSS";
import { customJobItemsList } from "../../rss/ExtractFilterDataFromRSS";

class JobItems extends Component {

    componentDidMount() {
      //fetch, parse and catch jobs data
      const dataFromRSS = this.props.fetchUpworkRSSFeed();
      dataFromRSS.then( 
        useFilterDataFromRSS(), // call business logic function that parses RSS text data
        this.props.getFilterData(customJobItemsList) //action creator passes parsed RSS data to redux store
      ).catch(() => this.props.catchErrors(true));
    }
    
    render() {
      console.log(this.props.customUpworkFeed);

        //show loading and catch errors
        if (this.props.upworkFeed.length === 0 && this.props.error === false) {
          return <div>Loading...</div>
        }
        if (this.props.error === true) {
          return <div>There was an error fetching your jobs data.</div>
        }

        /*return (
          <div>
            {this.props.customUpworkFeed.map((item, i) => (
              <div key = {i}>
                <p>{item.hourlyRange.lowPrice}</p>
                <p>{item.category}</p>
                <p>{item.skills}</p>
              </div>
            ))}
          </div>
        )*/

        return (
          <div>
            
            <div>
            {this.props.upworkFeed.items &&
              this.props.upworkFeed.items.map((item, i) => (
                <div key={i}>
                  <h1>{item.title}</h1>
                  <p>{parse(item.content)}</p>
                </div>
              ))}
              </div>

              <div>
            {this.props.customUpworkFeed.map((item, i) => (
              <div key = {i}>
                <p>{item.hourlyRange.lowPrice}</p>
                <p>{item.category}</p>
                <p>{item.skills}</p>
              </div>
            ))}
          </div>

          </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        upworkFeed: state.upworkFeed.feed, 
        error: state.errorInJobItems.error,
        customUpworkFeed: state.customUpworkFeed.data
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


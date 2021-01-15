import React, { Component } from "react";
import { connect } from "react-redux";
import parse from "html-react-parser";

import { fetchUpworkRSSFeed } from "../../actions/feedActions";
import { catchErrors } from "../../actions/errorActions";
import useFilterDataFromRSS from "../../rss/ExtractFilterDataFromRSS";
import { customJobItemsList } from "../../rss/ExtractFilterDataFromRSS";


class JobItems extends Component {

    componentDidMount() {
      //fetch, parse and catch jobs data
      const dataFromRSS = this.props.fetchUpworkRSSFeed();
      dataFromRSS/*.then( 
      () => useFilterDataFromRSS()
      )*/.catch(() => this.props.catchErrors(true));

      
      (async() => { console.log(await useFilterDataFromRSS())
      })() //executes the return values from the function
      
      console.log(customJobItemsList);

    }
    
    render() {
      console.log(customJobItemsList);
        //show loading and catch errors
        if (this.props.upworkFeed.length === 0 && this.props.error === false) {
          return <div>Loading...</div>
        }
        if (this.props.error === true) {
          return <div>There was an error fetching your jobs data.</div>
        }

        /*return (
          <div>
            { customJobItemsList.map((i) => (
              <div key = {i}>
                <h1>{customJobItemsList[i][0].title}</h1>
                <p>{parse(customJobItemsList[i][0].postContent)}</p>
                <p>{customJobItemsList[i][1].hourlyRange.jobType}</p>
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
          </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        upworkFeed: state.upworkFeed.feed, 
        error: state.errorInJobItems.error
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchUpworkRSSFeed : () => dispatch(fetchUpworkRSSFeed()),
        catchErrors : (error) => dispatch(catchErrors(ownProps.name, error))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (JobItems);


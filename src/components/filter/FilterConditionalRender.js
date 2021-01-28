import React, {Component} from "react";
import { connect } from "react-redux";
import parse from "html-react-parser";


class FilterConditionalRender extends Component {

    render () {
        console.log(this.props.filterArray);

      if (!this.props.filterArray) {
        return <div>No posting matched your search. Try searching for broader criteria...</div>
      }

        return (
            <div>
            {this.props.filterArray &&
              this.props.filterArray.map((item, i) => (
                <div key={i}>
                  <h1>{item.title}</h1>
                  <p>{parse(item.postContent)}</p>
                </div>
              ))}
              </div>
        )
    }
}

export default connect(null)(FilterConditionalRender);


import React, {Component} from "react";
import { connect } from "react-redux";
import parse from "html-react-parser";


class FilterConditionalRender extends Component {

    render () {
        console.log(this.props.filterArray);
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

/*const mapStateToProps = (state, ownProps) => {
  let name = ownProps.name;
  let localState = state[name];
  return {
    name: name,
    item: localState.item,
    customUpworkFeed: state.customUpworkFeed.data
  }
}*/

export default connect(null)(FilterConditionalRender);


import React, { Component } from "react";
import { connect } from "react-redux";
import XMLParser from "rss-parser";
import parse from "html-react-parser";

import { fetchUpworkFeed } from "../../actions/feedActions";
import { data } from "jquery";

let ParseXML = new XMLParser();
const MY_CORS_PROXY = "https://stormy-reef-80719.herokuapp.com/";
const REY_UPWORK_FEED = "https://www.upwork.com/ab/feed/topics/rss?securityToken=123d50f1f70d8c0eadc8a979e4d040edb78d0cb725790b7db03efad1d69a552926c06b2f642b293c5177aa4e7760863b24609b51710bfacdfb3d16df085829fc&userUid=763550953807126528&orgUid=1328438630798860289&sort=local_jobs_on_top";

class JobItems extends Component {

    async componentDidMount() {
        const upworkFeed = await ParseXML.parseURL(MY_CORS_PROXY + REY_UPWORK_FEED);
        this.props.fetchUpworkFeed(upworkFeed)
        //might need a .then here for the async promise
        this.parseDOM();     
    }

    parseDOM() {
      //NONE OF THIS IS ADDED TO THE DOM YET, HAVE TO FIGURE THAT OUT

      //get list of paragraph elements
      const pList = document.getElementsByTagName('p');
      console.log(pList);

      let dataList = { label: [], description: [] };

        //generate data list of filter labels and descriptions from DOM : dataList = {label: "Budget", description: "$1,500"}]
        for (let i = 0; i < pList.length; i++) {
            for (let j=0; j < pList[i].childNodes.length; j++) { 
                  if (pList[i].childNodes[j].nodeName === "B") {
                    dataList.label.push(
                      pList[i].childNodes[j].innerText.replace(/\s+/g, "") //remove white space
                    );
                    continue;
                  }
                if (
                  pList[i].childNodes[j].nodeName === "#text" &&
                  pList[i].childNodes[j].previousSibling &&
                  pList[i].childNodes[j].previousSibling.nodeName === "B"
                ) {
                  dataList.description.push(pList[i].childNodes[j].data );
                }
            }
      }
      
      console.log(dataList);

        //match label and description in the same object: dataMatchList = [{ "hourlyRange" : "$15.00-$35.00"}]
        let dataMatchList = [];
        for ( let k = 0; k < dataList.label.length; k++ ) {
            dataMatchList.push({ [dataList.label[k]] : dataList.description[k] });
        }
        console.log(dataMatchList);

        let jobList = [];
        for (let i = 0; i < pList.length; i++) {
            for (let j=0; j < pList[i].childNodes.length; j++) {
                for (let k=0; k < dataMatchList.length; k++) { 
            if (
              pList[i].childNodes[j].nextSibling && 
              (pList[i].childNodes[j].nextSibling.data === Object.values(dataMatchList[k]))
            ) {
              jobList.push({ [`jobItem${i}`]: dataMatchList[k] });
            }
        }
        }
    }
        console.log(jobList);
        console.log(pList[0].childNodes[18].nextSibling.data);
        console.log(dataList.description)
      
      /*

      //add a className to every b tag that effectively labels it
      const classList = noSpaceLabelList.map((label, i) => {
        bList[i].classList.add(label);
        return (
          <div key={i} className={label}>
            {bList[i]}
          </div>
        );
      });
      console.log(classList);

      //string methods can then parse out based on dashes or commas
      //css properties can hide certain elements from screen - display None
      //you can write in new html into the dom as well... right now it's <p><b>label</b>text</br></p>...should add div around every pair of label+text and include d-none as the class, take the values and include in your own UI

      //html parser can convert an attribute to a prop if you need it
      */
    }

    render() {
        return (
          <div>
            {this.props.upworkFeed.items &&
              this.props.upworkFeed.items.map((items, i) => (
                <div key={i}>
                  <h1>{items.title}</h1>
                  <p>{parse(items.content)}</p>
                </div>
              ))}
          </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        upworkFeed: state.upworkFeed.feed
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUpworkFeed : (feed) => dispatch(fetchUpworkFeed(feed))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (JobItems);


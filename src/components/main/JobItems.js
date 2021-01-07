import React, { Component } from "react";
import { connect } from "react-redux";
import XMLParser from "rss-parser";
import parse from "html-react-parser";

import { fetchUpworkFeed } from "../../actions/feedActions";


let ParseXML = new XMLParser();
const MY_CORS_PROXY = "https://stormy-reef-80719.herokuapp.com/";
const REY_UPWORK_FEED = "https://www.upwork.com/ab/feed/topics/rss?securityToken=123d50f1f70d8c0eadc8a979e4d040edb78d0cb725790b7db03efad1d69a552926c06b2f642b293c5177aa4e7760863b24609b51710bfacdfb3d16df085829fc&userUid=763550953807126528&orgUid=1328438630798860289&sort=local_jobs_on_top";

class JobItems extends Component {

    async componentDidMount() {
       //might need a .then here for the async promise, to catch errors
        const upworkFeed = await ParseXML.parseURL(MY_CORS_PROXY + REY_UPWORK_FEED);
        this.props.fetchUpworkFeed(upworkFeed);
        console.log(upworkFeed);

        const jobItems = upworkFeed.items;
        console.log(jobItems);

      //**** algorithm to parse each job item's RSS text into label/description pairs, so that they can be read by the job filters ****/

        //each paragraph tag corresponds to a jobItem
        const paragraphList = document.getElementsByTagName('p');
        //generate data list of filter labels and descriptions from DOM : labelList = {label: "Budget", description: "$1,500"}]
        let labelList = {label: [], description: []};
        for ( let i=0; i < paragraphList.length; i++) {
          for (let j=0; j < paragraphList[i].childNodes.length; j++) {
          if(paragraphList[i].childNodes[j].nodeName === "B") {   
            labelList.label.push(
                      paragraphList[i].childNodes[j].innerText.replace(/\s+/g, "")) //remove white space   
            continue;
          }
          if(paragraphList[i].childNodes[j].nodeName === "#text" &&
             paragraphList[i].childNodes[j].previousSibling &&
             paragraphList[i].childNodes[j].previousSibling.nodeName === "B"
          ) {
            labelList.description.push(paragraphList[i].childNodes[j].data)
          }
        }
      }
      console.log(labelList);

        //match label and description in the same object: labelMatchList = [{ "hourlyRange" : "$15.00-$35.00"}]
        let labelMatchList = [];
        for ( let k = 0; k < labelList.label.length; k++ ) {
            labelMatchList.push({ [labelList.label[k]] : labelList.description[k] });
        }
        console.log(labelMatchList);

        //chunk label array into subarrays, divided at each job item point, achieved by cutting arrays between the Country keys, an inflection point
        let sliceIndex = [0];
        labelMatchList.map((label, i) => {
          if ( Object.keys(label)[0] === "Country") {
            sliceIndex.push(i); // index of every "Country" label key: [0, 5, 10, 16...167]
          }
        })
        

        //need job item subarray slices of index 0 to (and including) 5, 6 to 10, 11 to 16, 17 to 23
        let startArray = [];
        let endArray = [];
        let startIndex = 0;
        let endIndex = 0;
        sliceIndex.map((slice, i)=> {
          if ( slice === 0) {
            startIndex= 0;
          } else {
            startIndex = slice+1; 
            endIndex = slice+1;
          }
          startArray.push(startIndex)
          endArray.push(endIndex);
        })
        startArray.pop(); //remove last element
        endArray.shift(); //remove first element

        //with the job item subarrays, we need to create separate array items for each job item, to then push them to the jobItems array
        // [0: [{Hourly : "$20-$30"}, {datePosted : January 7}], 1: [{Location: United States}]]
        let filterLabelsDividedByJobItem = [];
        startArray.map((start, i) => {
          filterLabelsDividedByJobItem.push(labelMatchList.slice(start,endArray[i]));
        })
        console.log(filterLabelsDividedByJobItem);

        //building custom job items list as a nested array to contain data object pairs
        let customJobItemsList = [];
        jobItems.map((item, i) => {return customJobItemsList.push([])})
        jobItems.map((item, i) => {return customJobItemsList[i].push(
          {title: item.title},
          {datePosted: item.pubDate},
          {postContent: item.content},
          {link: item.link},
          filterLabelsDividedByJobItem[i] //filter labels
          )})
        console.log(customJobItemsList);  
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


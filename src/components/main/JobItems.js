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
          startArray.push(startIndex);
          endArray.push(endIndex);
        })
        startArray.pop(); //remove last element
        endArray.shift(); //remove first element

        //with the job item subarrays, we need to create separate array items for each job item, to then push them to the jobItems array
        // [0: [{Hourly : "$20-$30"}, {datePosted : January 7}], 1: [{Location: United States}]]
        let filterLabelsArray= [];
        //let filterLabelsObject= {};
        startArray.map((start, i) => {
          return filterLabelsArray.push(labelMatchList.slice(start,endArray[i]));
          //filterLabelsObject = {...filterLabelsArray};
        })
        console.log(filterLabelsArray);

        //building custom job items list as a nested array to contain data object pairs
        let customJobItemsList = [];
        jobItems.map((item, i) => {return customJobItemsList.push([])})
        jobItems.map((item, i) => {
            return customJobItemsList[i].push(
            {title: item.title,
            datePosted: item.isoDate,
            postContent: item.content,
            link: item.link,
            filterLabelsArray: filterLabelsArray[i]} //filter labels [0: {label: description}, 1: {label:description}] -- indexes are linked to the filter labels
          )
        })
        console.log(customJobItemsList);
        console.log(Object.keys(customJobItemsList[0][0].filterLabelsArray[0])[0]); //first index in jobitem number (loop), 2nd is always 0, 3rd is an i loop for the filter, if === "Hourly Range"

        /**** assigning and cleaning variables for reading in filters ****/
        let hourlyRangeMap = new Map()
        let fixedPriceMap = new Map()
        let skillsMap = new Map()
        let locationMap = new Map()
        let categoryMap = new Map()
        //use RSS provided isoDate data point for date
        let skillsArray = [];
        let jobType = "hourly";
        for (let i = 0; i < customJobItemsList.length; i++) { //loop through each job item
          for (let j=0; j < filterLabelsArray[i].length; j++) { //loop through each filter label in each job item
            if (Object.keys(customJobItemsList[i][0].filterLabelsArray[j])[0] === "HourlyRange") {
              let hourlyRange = Object.values(customJobItemsList[i][0].filterLabelsArray[j])[0]; // ": $19.00-$46.00"
              let hourlyRangeLow = parseInt(hourlyRange.slice(3,8)); // convert string into workable integer
              let hourlyRangeHigh = parseInt(hourlyRange.slice(10));
              jobType = "hourly";
              hourlyRangeMap.set(`jobItem${i}`, { jobType: jobType, lowPrice: hourlyRangeLow, highPrice: hourlyRangeHigh}); 
              //[0: {jobItem5 => {jobType : hourly, lowPrice : 15, highPrice : 45}}] jobItem is the key, the object is the value
            }
            if (Object.keys(customJobItemsList[i][0].filterLabelsArray[j])[0] === "Budget") {
                let budget = Object.values(customJobItemsList[i][0].filterLabelsArray[j])[0]; // ": $600"
                let fixedPrice = parseInt(budget.slice(3)); // convert string into workable integer
                jobType = "fixedPrice";
                //fixedPriceArray.push({[i] : [jobType, fixedPrice]}); // [{job item number : [jobType, fixed price]}]
                fixedPriceMap.set(`jobItem${i}`, { jobType: jobType, price: fixedPrice});
              }
            if (Object.keys(customJobItemsList[i][0].filterLabelsArray[j])[0] === "Skills") {
                let skills = Object.values(customJobItemsList[i][0].filterLabelsArray[j])[0]; // ":React, Sass, Typescript"
                let skillsStringClean = skills.slice(1); // removes starting colon: "React, Sass, Typescript"
                skillsStringClean = skillsStringClean.split('     ').join(''); //removes large white space from between words
                skillsStringClean = skillsStringClean.trimEnd(); // remove white space at end of string
                skillsArray = skillsStringClean.split(","); //creates an array of the string list
                skillsArray = skillsArray.filter(s => !s.includes("employees")); //removes company size info from skills array
                skillsMap.set(`jobItem${i}`, { skills: skillsArray});
            }
            if (Object.keys(customJobItemsList[i][0].filterLabelsArray[j])[0] === "Country") {
              let location = Object.values(customJobItemsList[i][0].filterLabelsArray[j])[0];
              location = location.slice(2, -1); //removes starting colon and ending space: "United States"
              locationMap.set(`jobItem${i}`, { location: location });
            }
            if (Object.keys(customJobItemsList[i][0].filterLabelsArray[j])[0] === "Category") {
              let category = Object.values(customJobItemsList[i][0].filterLabelsArray[j])[0];
              category = category.slice(2);
              categoryMap.set(`jobItem${i}` , { category: category });
            }
          }
        }
        console.log(hourlyRangeMap);
        //console.log(hourlyRangeMap.get("jobItem2").lowPrice); //how to access variables by name, loop through jobItem[i] !!!
        //console.log([...hourlyRangeMap.keys()]); // ["jobItem1", "jobItem2"] spread operator converts map keys into array
        console.log(fixedPriceMap);
        console.log(skillsMap);
        console.log(locationMap);
        console.log(categoryMap);

        //original RSS: jobItems.isoDate: "2021-01-09T01:06:25.000Z"
        //const dateFormat = new Date(jobItems[0].isoDate);
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


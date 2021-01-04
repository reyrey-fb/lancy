import { FEED_FETCHED } from "./types";

//action creator to fetch the Upwork RSS feed
export const fetchUpworkFeed = feed => {
    return (dispatch) => {
        dispatch ({
            type: FEED_FETCHED,
            payload: feed 
        })
    }
}
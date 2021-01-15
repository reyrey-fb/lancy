import { GET_HOURLY_DATA } from "./types";

export const getHourlyData = (data) => {
    return (dispatch) => {
        dispatch({
            type: GET_HOURLY_DATA,
            payload: data
        })
    }
}
import { MIN_SELECTED, MAX_SELECTED } from "./types";

//Slider Minimum Value Selection Action Creator
export const selectMinValue = (name, value) => {
  return (dispatch) => {
    dispatch({
      type: `${name}/${MIN_SELECTED}`,
      payload: value
    });
  };
};

//Slider Maximum Value Selection Action Creator
export const selectMaxValue = (name, value) => {
  return (dispatch) => {
    dispatch({
      type: `${name}/${MAX_SELECTED}`,
      payload: value,
    });
  };
};

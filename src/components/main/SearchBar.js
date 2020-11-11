import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from "redux-form";
import { submitSearch } from '../../actions/searchActions';

import "../../scss/main.css";
import "../../scss/lancy.css";

//helper render function hoisted to prevent re-render of searchbar with every key stroke
const renderInput = ({ input }) => {
  return (
    <div className="ml-lg-5 container w-100">
      <label className="search d-block col-form-label-sm text-label position-relative">
        Search by Keyword
        <input
          {...input}
          type="text"
          placeholder="Search..."
          className="container-fluid py-4 px-5 border rounded-sm form-control"
        />
      </label>
    </div>
  );
};

const SearchBar = ({ handleSubmit, submitSearch }) => {

    const onSubmit = (formValues, dispatch) => {
        submitSearch(formValues); //calls search action creator
        dispatch(reset("SearchBar")); //clears search form after submission 
    }
    
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field
          name="search"
          component={renderInput}
        />
      </form>
    ); 
}

const mapDispatchToProps = dispatch => {
    return {
        submitSearch: (formValues) => dispatch(submitSearch(formValues))
    }
}

const formWrapped= reduxForm({
    form: "SearchBar"
}) (SearchBar);

export default connect(null, mapDispatchToProps)(formWrapped);
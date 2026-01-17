import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import * as actions from "../../actions";
import { withRouter } from "react-router-dom";

/**
 * SurveyFormReview
 *
 * Present the user with a read-only review of the survey form values
 * before sending. This component reads `formValues` from redux (via
 * `mapStateToProps`) and renders a label + value for each entry defined
 * in `formFields`.
 *
 * Props:
 * @param {Function} onCancel - handler invoked when the Back button is clicked
 * @param {Object<string, any>} formValues - key/value pairs of form fields
 *   (defaults to an empty object to avoid runtime errors when the form
 *   slice is not yet mounted).
 *
 * Behavior notes:
 * - `formValues` is optional; the component safely defaults to `{}` so
 *   it will render empty values rather than throw when the redux-form
 *   state is missing (e.g., on page refresh or direct navigation).
 */

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
    const reviewFields = formFields.map(({ label, name }) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>{formValues[name]}</div>
            </div>
        );
    });

    return (
        <div>
            <h5>Please confirm your entries</h5>
            {reviewFields}
            <button className="yellow darken-3 btn-flat white-text" onClick={ onCancel }>Back</button>
            <button onClick={() => submitSurvey(formValues, history)} className="green btn-flat right white-text">Send Survey<i className="material-icons right">email</i></button>   
        </div>
    );
};

// Get form values from redux store
function mapStateToProps(state) {
    return {
        formValues: state.form && state.form.surveyForm ? state.form.surveyForm.values : {}
    };
};

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));    
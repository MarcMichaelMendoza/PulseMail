import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import validateEmail from "../../utils/validateEmail";
import { Link } from "react-router-dom";
import formFields from "./formFields";

/**
 * SurveyForm
 *
 * Renders the survey input form using `redux-form` fields defined in
 * `formFields`. When the form is submitted it calls the parent
 * `onSurveySubmit` callback so the parent can toggle to the review step.
 *
 * Props:
 * @param {Function} onSurveySubmit - callback invoked on successful submit
 * @param {Function} handleSubmit - provided by `redux-form` to handle submit
 *
 * Notes:
 * - `destroyOnUnmount: false` is passed to `reduxForm` so the form values
 *   persist when unmounting the form to show the review step.
 */

class SurveyForm extends Component {
    renderFields() {
        return formFields.map(({ label, name }) => (
            <Field
                key={name}
                component={SurveyField}
                type="text"
                label={label}
                name={name}
            />
        )); 
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit( this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button className="teal btn-flat right white-text" type="submit">Next<i className="material-icons right">done</i></button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    /**
     * Validate form values.
     *
     * - Ensures all fields defined in `formFields` have a value.
     * - Validates the `recipient` with `validateEmail` when present and
     *   attaches a descriptive error message for invalid email addresses.
     *
     * @param {Object} values - key/value pairs of form inputs
     * @returns {Object} errors - mapping of fieldName -> errorMessage
     */
    const errors = {};
    formFields.forEach(({ name }) => {
        if (!values[name]) {
            errors[name] = "You must provide a value";
        }
    });

    if (values.recipients) {
        const emailError = validateEmail(values.recipients);
        if (emailError) {
            errors.recipients = emailError;
        }
    }

    return errors;
}

export default reduxForm({
        validate,
        form: 'surveyForm',
        destroyOnUnmount: false
    })(SurveyForm);
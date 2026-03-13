import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import validateEmail from "../../utils/validateEmail";
import { Link } from "react-router-dom";
import formFields from "./formFields";

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
            <div className="form-container">
                <div className="form-header">
                    <h2>Create a Survey</h2>
                    <p>Fill out the form below to create and send your email survey.</p>
                </div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <div className="form-actions">
                        <Link to="/surveys" className="btn btn-danger">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path fillRule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"/>
                            </svg>
                            Cancel
                        </Link>
                        <button className="btn btn-primary" type="submit">
                            Review
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path fillRule="evenodd" d="M8.22 2.97a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06l2.97-2.97H3.75a.75.75 0 010-1.5h7.44L8.22 4.03a.75.75 0 010-1.06z"/>
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

function validate(values) {
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
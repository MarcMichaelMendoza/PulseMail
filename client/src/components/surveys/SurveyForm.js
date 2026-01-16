import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";

class SurveyForm extends Component {
    render() {
        return (
            <div>
                <Field
                    label="Survey Title"
                    name="surveyTitle"
                    component="input"
                    type="text"
                />
                <Field
                    label="Subject Line"
                    name="surveySubject"
                    component="input"
                    type="text"
                />
                <Field
                    label="Email Body"
                    name="body"
                    component="input"
                    type="text"
                />
                <Field
                    label="Recipient List"
                    name="recipients"
                    component="input"
                    type="text"
                />
            </div>
        );
    }
}

export default reduxForm({
    form: 'surveyForm'
})(SurveyForm);
import React, { Component } from "react";
import SurveyForm from "./SurveyForm";

class SurveyNew extends Component {
    render() {
        return (
            <div>
                <h2>Create a New Survey</h2>
                <SurveyForm />
            </div>
        );
    }
}

export default SurveyNew;
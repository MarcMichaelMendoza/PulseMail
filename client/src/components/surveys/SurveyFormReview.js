import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import * as actions from "../../actions";
import { withRouter } from "react-router-dom";

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
    const reviewFields = formFields.map(({ label, name }) => {
        return (
            <div className="review-field" key={name}>
                <span className="review-field-label">{label}</span>
                <span className="review-field-value">{formValues[name]}</span>
            </div>
        );
    });

    return (
        <div className="review-container">
            <div className="review-header">
                <h2>
                    <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
                        <path fillRule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/>
                    </svg>
                    Review your survey
                </h2>
                <p>Please confirm the details below before sending.</p>
            </div>
            <div className="review-fields">
                {reviewFields}
            </div>
            <div className="review-actions">
                <button className="btn" onClick={onCancel}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path fillRule="evenodd" d="M7.78 12.53a.75.75 0 01-1.06 0L2.47 8.28a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 1.06L4.81 7h7.44a.75.75 0 010 1.5H4.81l2.97 2.97a.75.75 0 010 1.06z"/>
                    </svg>
                    Back
                </button>
                <button
                    onClick={() => submitSurvey(formValues, history)}
                    className="btn btn-primary"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                    Send Survey
                </button>
            </div>
        </div>
    );
};

const mapStateToProps = ({ form }) => ({
    formValues: form?.surveyForm?.values || {}
});

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
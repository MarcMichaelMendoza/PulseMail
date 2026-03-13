import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import SurveyList from "./surveys/SurveyList";

const Dashboard = ({ surveys }) => {
    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h2>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    Surveys
                    {surveys && surveys.length > 0 && (
                        <span className="survey-count">{surveys.length}</span>
                    )}
                </h2>
                <Link to="/surveys/new" className="btn btn-primary">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M7.75 2a.75.75 0 01.75.75V7h4.25a.75.75 0 110 1.5H8.5v4.25a.75.75 0 11-1.5 0V8.5H2.75a.75.75 0 010-1.5H7V2.75A.75.75 0 017.75 2z"/>
                    </svg>
                    New Survey
                </Link>
            </div>
            <SurveyList />
        </div>
    );
};

const mapStateToProps = ({ surveys }) => ({ surveys });
export default connect(mapStateToProps)(Dashboard);
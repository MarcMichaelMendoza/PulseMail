import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";

class SurveyList extends Component {
    state = { minLoading: true };

    componentDidMount() {
        this.props.fetchSurveys();
        this.timer = setTimeout(() => this.setState({ minLoading: false }), 800);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    renderSkeletons() {
        return Array.from({ length: 3 }).map((_, i) => (
            <div className="survey-card skeleton-card" key={i}>
                <div className="survey-card-header">
                    <div className="skeleton skeleton-title" />
                    <div className="skeleton skeleton-date" />
                </div>
                <div className="skeleton skeleton-body" />
                <div className="skeleton skeleton-body short" />
                <div className="survey-card-footer">
                    <div className="response-bar-wrap">
                        <div className="response-labels">
                            <div className="skeleton skeleton-stat" />
                            <div className="skeleton skeleton-stat" />
                        </div>
                        <div className="skeleton skeleton-bar" />
                    </div>
                </div>
            </div>
        ));
    }

    renderSurveys() {
        const { surveys } = this.props;

        if (surveys === null || this.state.minLoading) {
            return this.renderSkeletons();
        }

        if (surveys.length === 0) {
            return (
                <div className="empty-state">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    <h3>No surveys yet</h3>
                    <p>Create your first survey to start collecting feedback.</p>
                </div>
            );
        }

        return surveys.map((survey) => (
            <div className="survey-card" key={survey._id}>
                <div className="survey-card-header">
                    <h3 className="survey-card-title">{survey.title}</h3>
                    <span className="survey-date">
                        {new Date(survey.dateSent).toLocaleDateString('en-US', {
                            month: 'short', day: 'numeric', year: 'numeric'
                        })}
                    </span>
                </div>
                <p className="survey-card-body">{survey.body}</p>
                <div className="survey-card-footer">
                    {(() => {
                        const total = (survey.yes || 0) + (survey.no || 0);
                        const yesPct = total > 0 ? Math.round((survey.yes / total) * 100) : 0;
                        const noPct = total > 0 ? 100 - yesPct : 0;
                        return (
                            <div className="response-bar-wrap">
                                <div className="response-labels">
                                    <span className="response-label yes">Yes {yesPct}%</span>
                                    <span className="response-total">{total} response{total !== 1 ? 's' : ''}</span>
                                    <span className="response-label no">No {noPct}%</span>
                                </div>
                                <div className="response-bar">
                                    {total > 0 ? (
                                        <>
                                            <div className="response-bar-yes" style={{ width: `${yesPct}%` }} />
                                            <div className="response-bar-no" style={{ width: `${noPct}%` }} />
                                        </>
                                    ) : (
                                        <div className="response-bar-empty" />
                                    )}
                                </div>
                                {survey.lastResponded && (
                                    <span className="last-response">
                                        Last response: {new Date(survey.lastResponded).toLocaleDateString('en-US', {
                                            month: 'short', day: 'numeric'
                                        })}
                                    </span>
                                )}
                            </div>
                        );
                    })()}
                </div>
            </div>
        ));
    }

    render() {
        return <div className="survey-list">{this.renderSurveys()}</div>;
    }
}

const mapStateToProps = ({ surveys }) => ({ surveys });
export default connect(mapStateToProps, { fetchSurveys })(SurveyList);

import React, { Component } from "react";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

/**
 * SurveyNew
 *
 * Top-level survey flow component that toggles between the editable
 * `SurveyForm` and the read-only `SurveyFormReview` step.
 *
 * State:
 * - `showFormReview` (boolean) — when true the review step is shown.
 *
 * Interaction:
 * - `SurveyForm` receives an `onSurveySubmit` callback; when invoked the
 *   parent sets `showFormReview` true to display the review UI.
 * - `SurveyFormReview` receives an `onCancel` callback that resets
 *   `showFormReview` to false so the user can edit the form again.
 *
 * This component does not read or write form data itself — it simply
 * coordinates which child component is visible.
 */

class SurveyNew extends Component {
    state = { showFormReview: false };

    renderContent() {
        if (this.state.showFormReview) {
            return <SurveyFormReview onCancel={() => this.setState({ showFormReview: false })} />;
        }
        
        return <SurveyForm  onSurveySubmit={() => this.setState({ showFormReview: true })} />;
    } 

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

export default SurveyNew;
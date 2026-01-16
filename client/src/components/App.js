import React, { Component } from "react";
import  { BrowserRouter, Route} from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import axios from "axios";
import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";

// Main App component
class App extends Component {
    // Lifecycle method that runs after the component is mounted
    async componentDidMount() {
        this.props.fetchUser();
        
        // Check if returning from Stripe payment
        const urlParams = new URLSearchParams(window.location.search);
        const sessionId = urlParams.get('session_id');
        
        if (sessionId) {
            try {
                await axios.get(`/api/stripe/success?session_id=${sessionId}`);
                this.props.fetchUser();
                // Remove session_id from URL to prevent reprocessing on refresh
                window.history.replaceState({}, document.title, window.location.pathname);
            } catch (err) {
                console.error('Payment verification failed:', err);
                if (process.env.NODE_ENV === 'production') {
                    // Log to external error tracking service
                    alert('There was an issue processing your payment. Please contact support.');
                } else {
                    console.error('Payment verification failed:', err);
                }
            }
        }
    }
    // Render method to define the UI
    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route
                            exact={true}
                            path="/"
                            render={() => (this.props.auth ? <Dashboard /> : <Landing />)}
                        />
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route path="/surveys/new" component={SurveyNew} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

// Connect the App component to the Redux store and export it
const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, actions)(App);
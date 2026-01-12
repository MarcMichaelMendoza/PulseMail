import React, { Component } from "react";
import  { BrowserRouter, Route} from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import axios from "axios";

// Importing other components
import Header from "./Header";
import Landing from "./Landing";
const Dashboard = () => <h2>Dashboard</h2>; 
const SurveyNew = () => <h2>SurveyNew</h2>;

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
            } catch (err) {
                console.error('Payment verification failed:', err);
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
                        <Route exact={true} path="/" component={Landing} />
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route path="/surveys/new" component={SurveyNew} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

// Connect the App component to the Redux store and export it
export default connect(null, actions)(App);
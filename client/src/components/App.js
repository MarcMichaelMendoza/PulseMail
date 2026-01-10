import React, { Component } from "react";
import  { BrowserRouter, Route} from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

// Importing other components
import Header from "./Header";
const Dashboard = () => <h2>Dashboard</h2>; 
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;

// Main App component
class App extends Component {
    // Lifecycle method that runs after the component is mounted
    componentDidMount() {
        this.props.fetchUser();
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
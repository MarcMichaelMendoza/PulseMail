import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import axios from "axios";
import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";

class App extends Component {
    async componentDidMount() {
        this.props.fetchUser();

        const urlParams = new URLSearchParams(window.location.search);
        const sessionId = urlParams.get('session_id');

        if (sessionId) {
            try {
                await axios.get(`/api/stripe/success?session_id=${sessionId}`);
                this.props.fetchUser();
                window.history.replaceState({}, document.title, window.location.pathname);
            } catch (err) {
                console.error('Payment verification failed:', err);
            }
        }
    }

    render() {
        return (
            <BrowserRouter>
                <div className="app-wrapper">
                    <Header />
                    <main className="app-main">
                        <div className="app-container">
                            <Route
                                exact
                                path="/"
                                render={() => (this.props.auth ? <Dashboard /> : <Landing />)}
                            />
                            <Route exact path="/surveys" component={Dashboard} />
                            <Route path="/surveys/new" component={SurveyNew} />
                        </div>
                    </main>
                    <footer className="app-footer">
                        <div className="app-container">
                            <span className="footer-text">&copy; {new Date().getFullYear()} PulseMail. All rights reserved.</span>
                            <ul className="footer-links">
                                <li><a href="/">Terms</a></li>
                                <li><a href="/">Privacy</a></li>
                                <li><a href="/">Docs</a></li>
                            </ul>
                        </div>
                    </footer>
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = ({ auth }) => ({ auth });
export default connect(mapStateToProps, actions)(App);
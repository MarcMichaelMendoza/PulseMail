import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";

class Header extends Component {
    state = { minLoading: true };

    componentDidMount() {
        this.timer = setTimeout(() => this.setState({ minLoading: false }), 800);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    renderContent() {
        if (this.props.auth === null || this.state.minLoading) {
            return (
                <li>
                    <div className="skeleton skeleton-btn" />
                </li>
            );
        }

        switch (this.props.auth) {
            case false:
                return (
                    <li>
                        <a href="/auth/google" className="btn btn-primary">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path fillRule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1h-6a1 1 0 00-1 1v6.708A2.486 2.486 0 017.5 9h5V1.5z"/>
                            </svg>
                            Sign in with Google
                        </a>
                    </li>
                );
            default:
                return [
                    <li key="credits">
                        <span className="nav-credits">
                            <svg viewBox="0 0 16 16" fill="currentColor">
                                <path d="M8 0a8 8 0 110 16A8 8 0 018 0zM1.5 8a6.5 6.5 0 1013 0 6.5 6.5 0 00-13 0zm4.879-2.773l4.264 2.559a.25.25 0 010 .428l-4.264 2.559A.25.25 0 016 10.559V5.442a.25.25 0 01.379-.215z"/>
                            </svg>
                            {this.props.auth.credits || 0} credits
                        </span>
                    </li>,
                    <li key="payments"><Payments /></li>,
                    <li key="logout">
                        <a href="/api/logout" className="btn btn-sm">Logout</a>
                    </li>
                ];
        }
    }

    render() {
        return (
            <header className="app-header">
                <div className="app-container">
                    <Link to={this.props.auth ? "/surveys" : "/"} className="brand-logo">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <polyline points="22,6 12,13 2,6"/>
                        </svg>
                        PulseMail
                    </Link>
                    <ul className="nav-items">{this.renderContent()}</ul>
                </div>
            </header>
        );
    }
}

const mapStateToProps = ({ auth }) => ({ auth });
export default connect(mapStateToProps)(Header);
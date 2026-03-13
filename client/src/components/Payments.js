import React, { Component } from "react";
import axios from "axios";

class Payments extends Component {
    handleClick = async () => {
        const response = await axios.post("/api/stripe");
        window.location.href = response.data.url;
    };

    render() {
        return (
            <button className="btn btn-sm" onClick={this.handleClick}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M7.75 2a.75.75 0 01.75.75V7h4.25a.75.75 0 110 1.5H8.5v4.25a.75.75 0 11-1.5 0V8.5H2.75a.75.75 0 010-1.5H7V2.75A.75.75 0 017.75 2z"/>
                </svg>
                Add Credits
            </button>
        );
    }
}

export default Payments;
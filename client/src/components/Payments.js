import React, { Component } from "react";
import axios from "axios";

class Payments extends Component {
    handleClick = async () => {
        const response = await axios.post("/api/stripe");
        window.location.href = response.data.url;
    };

    render() {
        return (
            <button className="btn" onClick={this.handleClick}>
                Add Credits
            </button>
        );
    }
}

export default Payments;
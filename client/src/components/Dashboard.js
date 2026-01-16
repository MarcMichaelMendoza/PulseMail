import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <div style={{ textAlign: "center" }}>
            <h2>Dashboard</h2>
            <p>Here you can manage your email surveys and view responses.</p>
            <div className="fixed-action-btn">
                <Link to="/surveys/new" className="btn-floating btn-large red">
                    <i className="large material-icons">add</i>
                </Link>
            </div>
        </div>
    );
}

export default Dashboard;
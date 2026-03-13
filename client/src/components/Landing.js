import React from "react";

const Landing = () => {
    return (
        <div className="landing">
            <div className="landing-badge">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path fillRule="evenodd" d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9-3a1 1 0 11-2 0 1 1 0 012 0zM6.75 8a.75.75 0 000 1.5h.75v1.75a.75.75 0 001.5 0v-2.5A.75.75 0 008.25 8h-1.5z"/>
                </svg>
                Email survey platform
            </div>
            <h1>
                Collect feedback<br />
                <span className="text-gradient">at scale.</span>
            </h1>
            <p className="subtitle">
                Send email surveys to thousands of recipients and track responses 
                in real time. Built for teams that ship.
            </p>
            <div className="landing-cta">
                <a href="/auth/google" className="btn btn-primary btn-lg">
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                        <path fillRule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1h-6a1 1 0 00-1 1v6.708A2.486 2.486 0 017.5 9h5V1.5z"/>
                    </svg>
                    Get started with Google
                </a>
            </div>
            <div className="landing-features">
                <div className="feature-card">
                    <div className="feature-icon blue">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <polyline points="22,6 12,13 2,6"/>
                        </svg>
                    </div>
                    <h3>Email Surveys</h3>
                    <p>Create and send beautiful email surveys with customizable questions and recipient lists.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon green">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                        </svg>
                    </div>
                    <h3>Real-time Analytics</h3>
                    <p>Track yes/no responses as they come in. See instant results from your campaigns.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon orange">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                            <line x1="1" y1="10" x2="23" y2="10"/>
                        </svg>
                    </div>
                    <h3>Credit System</h3>
                    <p>Simple pay-as-you-go credits via Stripe. 5 credits for $5 — no subscriptions needed.</p>
                </div>
            </div>
        </div>
    );
};

export default Landing;
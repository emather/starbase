import React from 'react';

function Contact() {
    return (
        <div className="nes-container with-title is-centered is-dark" style={{ margin: "20px auto", maxWidth: "600px", padding: "20px" }}>
            <p className="title nes-text is-primary">Contact Us</p>

            {/* Transmission Message */}
            <p className="nes-text is-success" style={{ textAlign: "center", marginBottom: "20px" }}>
                📡 Initiate communication with Mission Control.
            </p>

            {/* Contact Email */}
            <div className="nes-container is-rounded" style={{ margin: "20px 0", textAlign: "center" }}>
                <h3 className="nes-text is-error">Direct Transmission</h3>
                <p>Reach us at:</p>
                <a href="mailto:info@mathengineeringsystems.com" className="nes-btn is-success">
                    info@mathengineeringsystems.com
                </a>
            </div>

            {/* Fun Contact Form */}
            <form className="nes-container is-rounded" style={{ padding: "20px", margin: "20px 0" }}>
                <h3 className="nes-text is-warning" style={{ marginBottom: "10px" }}>Send Us a Message</h3>
                <div className="nes-field">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" className="nes-input" placeholder="Enter your name..." />
                </div>
                <div className="nes-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" className="nes-input" placeholder="Enter your email..." />
                </div>
                <div className="nes-field">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" className="nes-textarea" placeholder="Type your message..."></textarea>
                </div>
                <button type="submit" className="nes-btn is-primary" style={{ marginTop: "10px" }}>
                    🚀 Send Transmission
                </button>
            </form>

            {/* Cosmic Footer */}
            <p className="nes-text is-warning" style={{ textAlign: "center", marginTop: "20px" }}>
                🌌 Our crew is ready for your message. Let's explore the unknown together!
            </p>
        </div>
    );
}

export default Contact;

import React from 'react';
import './About.css';

function About() {
    return (
        <div className="nes-container with-title" style={{ margin: "20px auto", maxWidth: "800px", fontFamily: "'VT323', monospace" }}>
            <p className="title" style={{ fontFamily: "'Press Start 2P', sans-serif", fontSize: "1.5rem" }}>
                About Us
            </p>
            
            <section className="nes-container is-dark" style={{ marginBottom: "20px", fontFamily: "'VT323', monospace" }}>
                <section className="message-list">
                    <section className="message -left">
                        <i className="nes-ash"></i>
                        <div className="nes-balloon from-left is-dark">
                            <p>Commander, the innovation levels are off the charts!</p>
                        </div>
                    </section>
                    <section className="message -right">
                        <div className="nes-balloon from-right is-dark">
                            <p>Roger that! Let’s initiate launch sequence.</p>
                        </div>
                        <i className="nes-mario"></i>
                    </section>
                </section>
            </section>

            <div className="nes-container is-rounded" style={{ marginBottom: "20px" }}>
                <h3 className="nes-text is-warning" style={{ fontFamily: "'Press Start 2P', sans-serif", fontSize: "1.2rem" }}>
                    Mission Attributes
                </h3>
                {/* Galactic Skill Bars */}
                <div className="nes-field" style={{ fontFamily: "'VT323', monospace" }}>
                    <label>🚀 Innovation</label>
                    <progress className="nes-progress is-success" value="95" max="100"></progress>
                </div>
                <div className="nes-field" style={{ fontFamily: "'VT323', monospace" }}>
                    <label>🛸 Space Exploration</label>
                    <progress className="nes-progress is-error" value="85" max="100"></progress>
                </div>
                <div className="nes-field" style={{ fontFamily: "'VT323', monospace" }}>
                    <label>👾 Fun Factor</label>
                    <progress className="nes-progress is-primary" value="100" max="100"></progress>
                </div>
                <div className="nes-field" style={{ fontFamily: "'VT323', monospace" }}>
                    <label>🌌 Cosmic Creativity</label>
                    <progress className="nes-progress is-warning" value="90" max="100"></progress>
                </div>
            </div>

            <div className="nes-container is-dark" style={{ textAlign: "center", padding: "20px" }}>
                <h3 className="nes-text is-primary" style={{ fontFamily: "'Press Start 2P', sans-serif" }}>
                    Launch Your Mission
                </h3>
                <button className="nes-btn is-warning" style={{ marginRight: "10px", fontFamily: "'Press Start 2P', sans-serif" }}>
                    Start Exploration
                </button>
                <button className="nes-btn is-error" style={{ fontFamily: "'Press Start 2P', sans-serif" }}>
                    Engage Thrusters
                </button>
            </div>
        </div>
    );
}

export default About;

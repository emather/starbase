import React, { useState, useEffect, useRef } from 'react';
import './Home.css';

function Home() {
    const [scaledCoords, setScaledCoords] = useState([]);
    const [debugMode, setDebugMode] = useState(false); // State to toggle debugging
    const [showIntro, setShowIntro] = useState(true); // For intro overlay
    const containerRef = useRef(null);

    // Original image dimensions
    const originalImageWidth = 1600;
    const originalImageHeight = 900;

    // Original clickable areas
    const originalCoords = [
        { shape: "rect", coords: [100, 300, 200, 400], href: "/building1", alt: "Building 1" },
        { shape: "rect", coords: [300, 300, 400, 400], href: "/building2", alt: "Building 2" },
        { shape: "rect", coords: [500, 300, 650, 350], href: "/launchpad", alt: "Launch Pad" },
        { shape: "rect", coords: [600, 400, 750, 500], href: "/hangar", alt: "Hangar" },
    ];

    useEffect(() => {
        function updateCoords() {
            const container = containerRef.current;
            if (!container) return;

            const { clientWidth, clientHeight } = container;

            const scaleY = clientHeight / originalImageHeight;
            const scaledWidth = originalImageWidth * scaleY;
            const horizontalCrop = Math.max(0, (scaledWidth - clientWidth) / 2);

            const newCoords = originalCoords.map(area => ({
                ...area,
                coords: area.coords.map((value, index) => {
                    return index % 2 === 0
                        ? value * scaleY - horizontalCrop
                        : value * scaleY;
                }),
            }));
            setScaledCoords(newCoords);
        }

        window.addEventListener("resize", updateCoords);
        updateCoords();

        return () => {
            window.removeEventListener("resize", updateCoords);
        };
    }, []);

    return (
        <div className="home-container" ref={containerRef}>
            {/* Intro Overlay */}
            {showIntro && (
                <div className="intro-overlay">
                    <h1 className="nes-text is-primary">Welcome to the Space Base</h1>
                    <p className="nes-text is-warning" style={{ marginBottom: "20px" }}>
                        Ready to launch your exploration mission?
                    </p>
                    <button
                        className="nes-btn is-success"
                        onClick={() => setShowIntro(false)}
                    >
                        Begin Exploration
                    </button>
                </div>
            )}

            {/* Debug clickable overlays */}
            {debugMode &&
                scaledCoords.map((area, index) => {
                    if (area.shape === "rect") {
                        const [x1, y1, x2, y2] = area.coords;
                        return (
                            <div
                                key={index}
                                onClick={() => (window.location.href = area.href)}
                                style={{
                                    position: "absolute",
                                    left: `${x1}px`,
                                    top: `${y1}px`,
                                    width: `${x2 - x1}px`,
                                    height: `${y2 - y1}px`,
                                    border: "2px solid red",
                                    backgroundColor: "rgba(255, 0, 0, 0.2)",
                                    cursor: "pointer",
                                    zIndex: 10,
                                }}
                            />
                        );
                    }
                    return null;
                })}

            {/* Debug Mode Toggle */}
            <div style={{ marginTop: "50px", textAlign: "center" }}>
                <button
                    onClick={() => setDebugMode(!debugMode)}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: debugMode ? "#f44336" : "#4caf50",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    {debugMode ? "Disable Debug" : "Enable Debug"}
                </button>
            </div>
        </div>
    );
}

export default Home;

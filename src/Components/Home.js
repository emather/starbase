import React, { useState, useEffect, useRef } from "react";
import "./Home.css";

function Home() {
    // States
    const [scaledCoords, setScaledCoords] = useState([]);
    const [debugMode, setDebugMode] = useState(false);
    const [showIntro, setShowIntro] = useState(true);
    const [shipPosition, setShipPosition] = useState(-200);
    const [frameIndex, setFrameIndex] = useState(0);
    const [isShipActive, setIsShipActive] = useState(false); // Switch to control the ship

    const containerRef = useRef(null);

    // Constants
    const totalFrames = 4;
    const frameWidth = 256;
    const spriteSheetWidth = totalFrames * frameWidth;

    // Original dimensions and coords
    const originalImageWidth = 1600;
    const originalImageHeight = 900;
    const originalCoords = [
        { shape: "rect", coords: [100, 300, 200, 400], href: "/building1", alt: "Building 1" },
        { shape: "rect", coords: [300, 300, 400, 400], href: "/building2", alt: "Building 2" },
        { shape: "rect", coords: [500, 300, 650, 350], href: "/launchpad", alt: "Launch Pad" },
        { shape: "rect", coords: [600, 400, 750, 500], href: "/hangar", alt: "Hangar" },
    ];

    // Update scaled coords on resize
    useEffect(() => {
        function updateCoords() {
            const container = containerRef.current;
            if (!container) return;

            const { clientWidth, clientHeight } = container;
            const scaleY = clientHeight / originalImageHeight;
            const scaledWidth = originalImageWidth * scaleY;
            const horizontalCrop = Math.max(0, (scaledWidth - clientWidth) / 2);

            const newCoords = originalCoords.map((area) => ({
                ...area,
                coords: area.coords.map((value, index) =>
                    index % 2 === 0 ? value * scaleY - horizontalCrop : value * scaleY
                ),
            }));

            setScaledCoords(newCoords);
        }

        window.addEventListener("resize", updateCoords);
        updateCoords();

        return () => {
            window.removeEventListener("resize", updateCoords);
        };
    }, []);

    // Animate ship position
    useEffect(() => {
        if (!isShipActive) return; // Stop animation if the ship is inactive

        const interval = setInterval(() => {
            setShipPosition((prev) => (prev > window.innerWidth ? -200 : prev + 2)); // Reset position
        }, 16); // ~60 FPS

        return () => clearInterval(interval);
    }, [isShipActive]);

    // Animate sprite sheet frames
    useEffect(() => {
        if (!isShipActive) return; // Stop animation if the ship is inactive

        const interval = setInterval(() => {
            setFrameIndex((prev) => (prev + 1) % totalFrames); // Loop frames
        }, 100); // ~10 FPS

        return () => clearInterval(interval);
    }, [isShipActive]);

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

            {/* Ship Animation */}
            {isShipActive && (
                <div
                    className="ship"
                    style={{
                        position: "absolute",
                        top: "400px",
                        left: `${shipPosition}px`,
                        width: `${frameWidth}px`,
                        height: "256px",
                        backgroundSize: `${spriteSheetWidth}px auto`,
                        backgroundPosition: `-${frameIndex * frameWidth}px 0`,
                        zIndex: 15,
                    }}
                ></div>
            )}

            {/* Debug Mode and Ship Controls */}
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
                <button
                    onClick={() => setIsShipActive(!isShipActive)} // Toggle ship animation
                    style={{
                        padding: "10px 20px",
                        backgroundColor: isShipActive ? "#f44336" : "#4caf50",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginLeft: "10px",
                    }}
                >
                    {isShipActive ? "Stop Ship" : "Start Ship"}
                </button>
            </div>
        </div>
    );
}

export default Home;

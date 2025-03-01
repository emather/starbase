import React, { useState, useEffect, useRef } from "react";
import "./Home.css";

function Home() {
    // States
    const [scaledCoords, setScaledCoords] = useState([]);
    const [debugMode, setDebugMode] = useState(false); // Toggles debugging
    const [showIntro, setShowIntro] = useState(true);
    const [shipPosition, setShipPosition] = useState(-200);
    const [frameIndex, setFrameIndex] = useState(0);
    const [isShipActive, setIsShipActive] = useState(false); // Switch to control the ship
    const [useSpriteSheet, setUseSpriteSheet] = useState(true); // To toggle between sprite sheet and static image


    const containerRef = useRef(null);

    // Constants
    const totalFrames = 4;
    const frameWidth = 256;
    const spriteSheetWidth = totalFrames * frameWidth;

    // Original dimensions and clickable areas
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
    // Animate ship position smoothly with requestAnimationFrame
    useEffect(() => {
        if (!isShipActive) return;

        let animationFrameId; // Track animation frame for cleanup
        const moveShip = () => {
            setShipPosition((prev) => (prev > window.innerWidth ? -200 : prev + 2)); // Reset position
            animationFrameId = requestAnimationFrame(moveShip); // Schedule the next frame
        };

        animationFrameId = requestAnimationFrame(moveShip); // Start animation

        return () => cancelAnimationFrame(animationFrameId); // Cleanup on stop
    }, [isShipActive]);


    // Animate sprite sheet frames
    useEffect(() => {
        if (!isShipActive) return;

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

            {/* Debug Clickable Overlays */}
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

            {/* Ship Animation */}
            {isShipActive && (
                <div
                    className={`ship ${useSpriteSheet ? "ship-sprite" : "ship-static"}`}
                    style={{
                        left: `${shipPosition}px`, // Dynamically set position
                        backgroundPosition: useSpriteSheet
                            ? `-${frameIndex * frameWidth}px 0` // For sprite sheet animation
                            : "center", // Static image background position
                    }}
                ></div>
            )}

            <div style={{ marginTop: "20px", textAlign: "center" }}>
                <button
                    onClick={() => setUseSpriteSheet(!useSpriteSheet)}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: useSpriteSheet ? "#f44336" : "#4caf50",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    {useSpriteSheet ? "Use Static Image" : "Use Sprite Sheet"}
                </button>
            </div>


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
                    onClick={() => setIsShipActive(!isShipActive)}
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

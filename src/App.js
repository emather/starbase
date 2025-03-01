import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import 'nes.css/css/nes.min.css';

function App() {
    const location = useLocation();

    useEffect(() => {
        // Add or remove class based on the route
        if (location.pathname === '/') {
            document.body.classList.add('home-page');
        } else {
            document.body.classList.remove('home-page');
        }
    }, [location]);

    return (
        <div className="nes-container is-rounded">
            {/* Retro Styled Header */}
            <h1 className="nes-text is-primary">Starbase Technologies</h1>

            {/* Updated Navigation Menu */}
            <nav className="nes-container is-dark" style={{ margin: '20px 0', padding: '10px' }}>
                <ul style={{ display: 'flex', justifyContent: 'space-around', listStyleType: 'none', margin: 0, padding: 0 }}>
                    <li><Link to="/" className="nes-btn is-primary">Home</Link></li>
                    <li><Link to="/about" className="nes-btn is-success">About</Link></li>
                    <li><Link to="/contact" className="nes-btn is-warning">Contact</Link></li>
                </ul>
            </nav>

            {/* Main Content Area */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </div>
    );
}

export default function AppWrapper() {
    return (
        <Router basename='starbase'>
            <App />
        </Router>
    );
}

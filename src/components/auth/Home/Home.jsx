import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Home.css';
import downloadImage from './download.jpeg';
import BannerImage from './Banner.png';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {isLoading ? (
                <div id="splash-screen">
                    <div className="logo-container">
                        <img src={downloadImage} alt="logo" className="logo" />
                        <h1 className="logo-text1">HMS</h1>
                        <h2 className="logo-name1">Hospital Management System</h2>
                        <h1 className="splash-heading">
                            <span className="falling-text" style={{ animationDelay: "0s" }}>Your</span>
                            <span className="falling-text" style={{ animationDelay: "0.2s", color: "green" }}>health</span>
                            <span className="falling-text" style={{ animationDelay: "0.4s" }}>is</span>
                            <span className="falling-text" style={{ animationDelay: "0.6s" }}>our</span>
                            <span className="falling-text" style={{ animationDelay: "0.8s" }}>priority,</span>
                            <span className="falling-text" style={{ animationDelay: "1s", color: "purple" }}>together</span>
                            <span className="falling-text" style={{ animationDelay: "1.2s" }}>we</span>
                            <span className="falling-text" style={{ animationDelay: "1.4s" }}>can</span>
                            <span className="falling-text" style={{ animationDelay: "1.6s" }}>build</span>
                            <span className="falling-text" style={{ animationDelay: "1.8s" }}>a</span>
                            <span className="falling-text" style={{ animationDelay: "2s", color: "red" }}>healthier</span>
                            <span className="falling-text" style={{ animationDelay: "2.2s" }}>tomorrow.</span>
                        </h1>
                    </div>
                </div>
            ) : (
                <div id="main-content">
                    <header className="navbar">
                        <div className="logo-section">
                            <h1 className="logo-text">Hospital-Management-System</h1>
                                <h2 className="logo-name"></h2>
                        </div>
                        <nav className="nav-links">
                            <Link to="/signup" className="registration-link">Register</Link>
                            <Link to="/login" className="registration-link">Login</Link>
                        </nav>
                    </header>
                    <img src={BannerImage} alt="bannerImage" className="bannerImage"/>
                </div>
            )}
        </>
    );
}

export default Home;


import { IoArrowBack } from "react-icons/io5";
import React from 'react';
import './AboutUs.css';
export const AboutUsPage = () => {
    return (
        <div className="about-us-page">
            <nav className="navbar navbar-expand-lg" data-bs-theme="dark">
                <div className="container-fluid">
                    <div className="nav-btns">
                        <button className="btn btn-outline-light me-2" onClick={() => window.history.back()}>
                            <IoArrowBack /> Back
                        </button>
                    </div>
                </div>
            </nav>
            <main>
                <div className='heading'>
                    <h1>About Us</h1>
                </div>
                <section className="about">
                    <h2>Our Story</h2>
                    <p>Linotix is a travel agency that offers a variety of services to help you plan your next trip. We offer bus and train tickets, as well as hotel reservations and car rentals. Our goal is to make travel planning as easy and stress-free as possible, so you can focus on enjoying your trip.</p>
                </section>
                <section className="about">
                    <h2>Our Team</h2>
                    <div className="team-members">
                        <div className="team-member">
                            <img src="https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?t=st=1715757783~exp=1715761383~hmac=0885cebc47197c81885c63479efe2e95562ca1ab254f2df222e6c42e70e42a33&w=740" alt="Team Member 1" />
                            <h3>Wasee-Ur-Rehman</h3>
                            <p>Founder & CEO</p>
                        </div>
                    </div>
                </section>
            </main>
            <footer>
                <p>&copy; 2024 Linotix. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default AboutUsPage;
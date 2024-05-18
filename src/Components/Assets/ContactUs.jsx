
import { IoArrowBack } from "react-icons/io5";
import React from 'react';
import './AboutUs.css';

export const ContactUsPage = () => {
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
                    <h1>Contact Us</h1>
                </div>
                <section className="about">
                    <h2> Contact me at: </h2>
                    <p className='ContactMail'>waseeurrehmanch@gmail.com</p>
                </section>
                <section className="about">
                    <div className="team-members">
                        <div className="team-member">
                            <img src="https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?t=st=1715757783~exp=1715761383~hmac=0885cebc47197c81885c63479efe2e95562ca1ab254f2df222e6c42e70e42a33&w=740" alt="Team Member 1" />
                            <h3>Wasee-Ur-Rehman</h3>
                            <p>Founder & CEO</p>
                        </div>
                        
                        {/* Add more team members as needed */}
                    </div>
                </section>
            </main>
            <footer>
                <p>&copy; 2024 Linotix. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default ContactUsPage;


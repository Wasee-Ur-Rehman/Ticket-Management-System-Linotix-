import React from 'react'
import './HomePage.css';
import { IoLogOutOutline } from "react-icons/io5";


export const HomePage = () => {
    return (
        <div className="home-page">
            <nav className="navbar navbar-expand-lg" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Linotix</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/AboutUs">About</a>
                            </li>
                            <li className="nav-item">
                                <a className='nav-link' href="/ContactUs">Contact</a>
                            </li>
                            <li className="nav-item">
                                <a className='nav-link' href="/Login"><IoLogOutOutline />Log Out</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container">
                <div className="card text-bg-light " style={{ width: '18rem' }}>
                    <img src="https://images.unsplash.com/photo-1626448167527-33aec453f913?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Bus</h5>
                        <p className="card-text">City hopping made easy. Book your bus trip today and explore!</p>

                        <button onClick={() => window.location.href = "/BusModule"} className="btn btn-primary">Reserve Now</button>
                    </div>
                </div>
                <div className="card text-bg-light " style={{ width: '18rem' }}>
                    <img src="https://images.unsplash.com/photo-1601999007938-f584b47324ac?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Train</h5>
                        <p className="card-text"> Enjoy stress-free train travel by booking a ticket in seconds.</p>
                        <button className="btn btn-secondary">Coming Soon</button>
                    </div>
                </div>
                <div className="card text-bg-light " style={{ width: '18rem' }}>
                    <img src="https://img.freepik.com/free-photo/airplane-taking-off-sunset-scene-generative-ai_188544-8034.jpg?t=st=1715760001~exp=1715763601~hmac=2f68abceacee840fb1b13d0275b18efe7ed6c1f472ab9a16879f6e551aff6519&w=900" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Airplane</h5>
                        <p className="card-text"> Go anywhere within blink of an eye without any fuss and hassle.</p>
                        <button className="btn btn-secondary">Coming Soon</button>
                    </div>
                </div>
            </div>

        </div>

    )

}

export default HomePage;
import React, { useState } from 'react';
import { IoArrowBack } from "react-icons/io5";
import './BusModule.css';

export const BusModule = () => {
    // State variables to store buses, departure, arrival, and date
    const [buses, setBuses] = useState([]);
    const [departure, setDeparture] = useState('');
    const [arrival, setArrival] = useState('');
    const [date, setDate] = useState('');

    const [busId, setBusId] = useState('');

    const [email, setEmail] = useState('');

    // ARRAY FOR TICKET ID
    const [ticketId, setTicketId] = useState([]);

    // make a function to get bus_Id of the bus user select by clicking book now button

    const handleBusId = (busId) => {
        setBusId(busId);
        console.log(busId);
    }
    const [userId, setUserId] = useState('');

    const handleAuthentication = async (username, password) => {
        // make a post request to the server to authenticate the user email and get the user id
        // give him email and take user id
        try {
            const response = await fetch('http://localhost:3001/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();
            console.log(data);
            if (data.User_Id === undefined) {
                alert("User not found");
                return;
            }
            // show the user id in the console
            console.log(data.User_Id);
            setUserId(data.User_Id);
            // make a post request to the server to book the bus
            // give him bus id and user id
            const response2 = await fetch('http://localhost:3001/bookBus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ busId, userId })
            });

            // give the correct json response
            const data2 = await response2.json();
            console.log(data2);

            console.log(data2.ticketId);
            // close the modal

            alert("Ticket is booked with the ticket id: " + data2.ticketId);
            const closeButton = document.querySelector('#staticBackdrop .btn-close');
            // send the email to the user
            sendEmail(email, data2.ticketId);
            closeButton.click();

        } catch (error) {
            console.error(error);
        }

    }
    // Function to handle search button click
    const handleSearch = async () => {
        try {
            const response = await fetch('http://localhost:3001/fetchBuses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ departure, arrival, date })
            });

            const data = await response.json();
            setBuses(data);
        } catch (error) {
            console.error(error);
        }
    };
    const getCurrentDate = () => {
        const today = new Date();
        let month = String(today.getMonth() + 1);
        let day = String(today.getDate());
        const year = today.getFullYear();

        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }

        return `${year}-${month}-${day}`;
    };

    // write a function that will send email and and display all ticket id of the user in the console

    const SeeTickets = async () => {
        try {
            const response = await fetch('http://localhost:3001/seeTicket', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();
            console.log(data);
            // STORE THIS IN AN ARRAY AS WE WILL HAVE MULTIPLE TICKETS
            setTicketId(data);
        } catch (error) {
            console.error(error);
        }
    }

    // make a function to cancel the booking of the ticket by sending the ticket id to the server
    // and then display the message in the console
    const CancelBooking = async (ticketId) => {
        try {
            const response = await fetch('http://localhost:3001/cancelTicket', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ticketId })
            });

            const data = await response.json();
            console.log(data);
            alert(data.message);
            setTicketId([]);
        } catch (error) {
            console.error(error);
        }
    }

    // make a function to contact with the node mailer in the server.js file pass it the email and the ticket id and bus id with departure time 

    const sendEmail = async (email, ticketId, busName, departureTime) => {
        try {
            const response = await fetch('http://localhost:3001/sendEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, ticketId, busName, departureTime })
            });

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }



    return (
        <>
            <div className='BusModule'>
                <div>
                    <nav className="navbar navbar-expand-lg" data-bs-theme="dark">
                        <div className="container-fluid">
                            <div className='nav-btns'>
                                <button className="btn btn-outline-light me-2" onClick={() => window.history.back()}>
                                    <IoArrowBack /> Back
                                </button>
                                <div className='View-Ticket'>
                                    <button className="btn btn-outline-light me-2" data-bs-toggle="modal" data-bs-target="#ViewTicketModel">View Tickets</button>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>

                <div className="bcontainer">
                    <div className="bus-card">
                        <div className="text">
                            <h2>Search For Buses</h2>
                            <p>City hopping made easy. Book your bus trip today and explore!</p>
                        </div>
                        <div className="bcard-body">
                            <div className='Departure'>
                                <select className="Select-Option" aria-label="Departure" value={departure} onChange={(e) => setDeparture(e.target.value)}>
                                    <option value="" disabled>Select Departure</option>
                                    <option value="Gujranwala">Gujranwala</option>
                                    <option value="Multan">Multan</option>
                                    <option value="Lahore">Lahore</option>
                                </select>
                            </div>
                            <div className="Arrival">
                                <select className="Select-Option" aria-label="Arrival" value={arrival} onChange={(e) => setArrival(e.target.value)}>
                                    <option value="" disabled>Select Arrival</option>
                                    <option value="Gujranwala">Gujranwala</option>
                                    <option value="Multan">Multan</option>
                                    <option value="Lahore">Lahore</option>
                                </select>
                            </div>
                            <div className="Date">
                                <input type="date" className="date" name="date" value={date} min={getCurrentDate()} onChange={(e) => setDate(e.target.value)} />


                            </div>
                            <div className='Search'>
                                <button className='search-btn' onClick={handleSearch}>Search</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Render bus cards */}
            <div className="searchContainer">
                <div className="searchcard">
                    <div className="card-body">
                        {/* Render bus cards only if buses are available */}
                        {buses.length > 0 && buses.map(bus => (

                            <div key={bus.Bus_Id} className="ResultedCard mb-3">

                                <h5 className="Bus-Name">{bus.BusName} Id : {bus.Bus_Id}</h5>
                                <div className="All-Buses">
                                    <p className="card-text">Departure: {bus.StartingLocation}</p>
                                    <p className="card-text">Arrival: {bus.EndingLocation}</p>
                                    <p className="card-text">Time: {bus.DepartureTime}</p>
                                    <p className='card-text'>Price: {bus.Price}</p>
                                    {/* Add other details such as price, time, etc. */}
                                    <button className="book-btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => handleBusId(bus.Bus_Id)}>Book Now</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Payment Confirmation</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* To confirm ask the user to enter his email, and then display the id of the bus he choosed */}

                            <div className="boxOfMail">
                                <input type='email' className="Mail" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div>
                                <button className="confirm-btn" onClick={handleAuthentication}>Confirm</button>
                            </div>


                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="ViewTicketModel" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Ticket Details</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* To confirm ask the user to enter his email, and then display the id of the bus he choosed */}

                            <div className="boxOfMail">
                                <input type='email' className="Mail" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div>
                                <button className="confirm-btn" onClick={SeeTickets}>Confirm</button>
                            </div>
                            <div className='Tickets'>
                                {ticketId.length > 0 && ticketId.map(ticket => (
                                    // every detail of the ticket return from the seeTicket endpoint
                                    <div key={ticket.Ticket_Id} className="Ticket-Card">
                                        <p>Ticket Id: {ticket.Ticket_Id}</p>
                                        <p>Bus Id: {ticket.Bus_Id}</p>
                                        <p>Starting Location: {ticket.StartingLocation}</p>
                                        <p>Ending Location: {ticket.EndingLocation}</p>
                                        <p>Departure Time: {ticket.DepartureTime}</p>
                                        <p>Departure Date: {ticket.DepartureDate}</p>
                                        <button className="btn btn-danger" onClick={() => CancelBooking(ticket.Ticket_Id)}>Cancel Booking</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

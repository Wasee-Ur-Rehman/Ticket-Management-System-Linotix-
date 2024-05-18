import React from 'react'
import './AdminPanel.css';
import { IoArrowBack } from "react-icons/io5";
import { useState } from 'react';

export const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [buses, setBuses] = useState([]);
    // MAKE A FUNCTION THAT WILL FETCH THE USERS FROM THE DATABASE

    const fetchUsers = async () => {
        try {
            console.log('Fetching Users');
            const response = await fetch('http://localhost:3001/users');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error(error);
        }
    }
    const deleteUser = (userId) => async () => {
        try {
            console.log('Deleting User');
            const response = await fetch('http://localhost:3001/deleteUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId })
            });
            const data = await response.json();
            console.log('User Deleted');
            alert('User Deleted');
            fetchUsers();
        } catch (error) {
            console.error(error);
        }
    }

    // write a function to get all the buses from the database

    const fetchAllBuses = async () => {
        try {
            console.log('Fetching Buses');
            const response = await fetch('http://localhost:3001/buses');
            const data = await response.json();
            setBuses(data);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }
    // write a function to delete a sppecific bus from the database

    const deleteBus = (busId) => async () => {
        try {
            console.log('Deleting Bus');
            const response = await fetch('http://localhost:3001/deleteBus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ busId })
            });
            const data = await response.json();
            console.log('Bus Deleted');
            alert('Bus Deleted');
            fetchAllBuses();
        } catch (error) {
            console.error(error);
        }
    }

    // write a function to add a new bus to the database
    // by taking the input from the user and sending it to the server
    // also send the ticket price to the stored procedure

    const addBus = async () => {
        try {
            console.log('Adding Bus');
            const BusName = document.getElementById('BusName').value;
            const StartingLocation = document.getElementById('StartingLocation').value;
            const EndingLocation = document.getElementById('EndingLocation').value;
            const DepartureTime = document.getElementById('DepartureTime').value;
            const DepartureDate = document.getElementById('DepartureDate').value;
            const TotalSeats = document.getElementById('TotalSeats').value;
            const TicketPrice = document.getElementById('TicketPrice').value;
            // displaty the values to check if they are correct
            console.log(BusName, StartingLocation, EndingLocation, DepartureTime, DepartureDate, TotalSeats, TicketPrice);
            const response = await fetch('http://localhost:3001/addBus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ BusName, StartingLocation, EndingLocation, DepartureTime, DepartureDate, TotalSeats, TicketPrice })
            });
            const data = await response.json();
            console.log('Bus Added');
            alert('Bus Added');
            fetchAllBuses();
            // set the input fields to empty after the bus is added
            document.getElementById('BusName').value = '';
            document.getElementById('StartingLocation').value = '';
            document.getElementById('EndingLocation').value = '';
            document.getElementById('DepartureTime').value = '';
            document.getElementById('DepartureDate').value = '';
            document.getElementById('TotalSeats').value = '';
            document.getElementById('TicketPrice').value = '';

        } catch (error) {
            console.error(error);
        }
    }






    return (
        <>
            <div>
                <nav className="navbar navbar-expand-lg" data-bs-theme="dark">
                    <div className="container-fluid">
                        <div className='nav-btns'>
                            <button className="btn btn-outline-light me-2" onClick={() => window.history.back()}>
                                <IoArrowBack /> Back
                            </button>
                        </div>
                        <div className='title'>
                            <h5>ADMIN PANEL</h5>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="container">
                <div className="card text-bg-light " style={{ width: '18rem' }}>
                    <img src="https://img.freepik.com/free-photo/flat-lay-paper-clips-with-green-background_23-2148999163.jpg?t=st=1715763759~exp=1715767359~hmac=0b0c79d88d1f643cc8653c047b8dfe94c89e3975f73dfe2597f84948fb061aa5&w=900" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Manage Users</h5>
                        <p className="card-text">View registered Users and Delete unauthorized ones!</p>
                        <button className="btn btn-primary" onClick={fetchUsers} data-bs-toggle="modal" data-bs-target="#ViewUsers">View Users</button>
                    </div>
                </div>
                <div className="card text-bg-light " style={{ width: '18rem' }}>
                    <img src="https://img.freepik.com/free-vector/man-buying-bus-ticket-via-terminal_74855-14103.jpg?t=st=1715764101~exp=1715767701~hmac=750bb0f75dbc623e6bff7da228b216ffdaaeb4db682fc4a5ae764b99f3b11fe7&w=900" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Manage Buses</h5>
                        <p className="card-text">View and delete buses without any hassle!</p>
                        <button className="btn btn-primary" onClick={fetchAllBuses} data-bs-toggle="modal" data-bs-target="#ViewBuses">View Buses</button>
                    </div>
                </div>
                <div className="card text-bg-light " style={{ width: '18rem' }}>
                    <img src="https://img.freepik.com/free-vector/man-buying-bus-ticket-via-terminal_74855-14103.jpg?t=st=1715764101~exp=1715767701~hmac=750bb0f75dbc623e6bff7da228b216ffdaaeb4db682fc4a5ae764b99f3b11fe7&w=900" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Add New Buses</h5>
                        <p className="card-text">Easily add a new bus on go!</p>
                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#AddBuses">Add Bus Now</button>
                    </div>
                </div>
            </div>




            <div className="modal fade" id="ViewUsers" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">User Details</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='Users'>
                                {users.map((user) => (
                                    <div key={user.User_Id} className="card text-bg-light mb-3" style={{ width: '18rem' }}>
                                        <div className="card-body">
                                            <h5 className="card-title">User ID: {user.User_Id}</h5>
                                            <p className="card-text">Name: {user.UserName}</p>
                                            <p className="card-text">Email: {user.Email}</p>
                                            <p className="card-text">Phone Number: {user.Phone_Number}</p>
                                            <p className="card-text">City : {user.City}</p>
                                            {/* make a delete button too */}
                                            <button onClick={deleteUser(user.User_Id)} className="btn btn-danger">Delete</button>
                                        </div>
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
            <div className="modal fade" id="ViewBuses" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Bus Details</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='Buses'>
                                {buses.map((bus) => (
                                    <div key={bus.Bus_Id} className="card text-bg-light mb-3" style={{ width: '18rem' }}>
                                        <div className="card-body">
                                            <h5 className="card-title">Bus ID: {bus.Bus_Id}</h5>
                                            <p className="card-text">Starting Location: {bus.StartingLocation}</p>
                                            <p className="card-text">Ending Location: {bus.EndingLocation}</p>
                                            <p className="card-text">Departure Time: {bus.DepartureTime}</p>
                                            <p className="card-text">Departure Date: {bus.DepartureDate}</p>
                                            {/* seat too */}
                                            <p className="card-text">Seats: {bus.TotalSeats}</p>
                                            {/* make a delete button too */}
                                            <button onClick={deleteBus(bus.Bus_Id)} className="btn btn-danger">Delete</button>
                                        </div>
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
            <div className="modal fade" id="AddBuses" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Add Buses</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='Buses'>
                                {/* Make input fields to get input from the user */}

                                <form>
                                    <div className="mb-2">
                                        {/* bus name */}
                                        <label htmlFor="BusName" className="form-label">Bus Name</label>
                                        <input type="text" className="form-control" id="BusName" />
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="StartingLocation" className="form-label">Starting Location</label>
                                        <input type="text" className="form-control" id="StartingLocation" />
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="EndingLocation" className="form-label">Ending Location</label>
                                        <input type="text" className="form-control" id="EndingLocation" />
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="DepartureTime" className="form-label">Departure Time</label>
                                        <input type="text" className="form-control" id="DepartureTime" />
                                    </div>
                                    <div className="mb-2">
                                        {/* make a placeholder for correct date enterance according to sql */}
                                        <label htmlFor="DepartureDate" className="form-label" >Departure Date</label>
                                        <input type="text" className="form-control" id="DepartureDate" placeholder='2024-05-15' />
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="TotalSeats" className="form-label">Total Seats</label>
                                        <input type="text" className="form-control" id="TotalSeats" />
                                    </div>
                                    {/* make for ticket price to for an input to the stored procedure */}
                                    <div className="mb-2">
                                        <label htmlFor="TicketPrice" className="form-label">Ticket Price</label>
                                        <input type="text" className="form-control" id="TicketPrice" />
                                    </div>

                                    <button type="button" onClick={addBus} className="btn btn-primary">Add Bus</button>

                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

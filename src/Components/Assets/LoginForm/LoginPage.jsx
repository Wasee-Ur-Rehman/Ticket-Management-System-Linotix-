import React from 'react'
import { useState } from 'react';
import './LoginPage.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { IoMail } from "react-icons/io5";


export const LoginPage = () => {
  // States
  const [regUserName, setRegUserName] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regCity, setRegCity] = useState('Multan');

  const [loginUserName, setLoginUserName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleRegister = async (e) => {
    console.log("entered register function");
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: regUserName,
          password: regPassword,
          email: regEmail,
          city: regCity,
        }),
      });

      if (!response.ok) {
        // Check for specific error message indicating email already exists
        if (response.status === 400 && await response.json().message === 'Email already in use!') {
          throw new Error('Email already in use');
        } else {
          throw new Error('Something went wrong');
        }
      }

      const data = await response.json();
      console.log(data);

      // After successful registration
      setRegUserName('');
      setRegPassword('');
      setRegEmail('');
      setRegCity('');

      console.log(regUserName, regPassword, regEmail, regCity);
      console.log("Data inserted successfully");
      window.location.href = '/HomePage';
    } catch (error) {
      console.error(error);
      setRegUserName('');
      setRegPassword('');
      setRegEmail('');
      setRegCity('');

      // Display specific error message for email already in use
      if (error.message === 'Email already in use') {
        alert('Email already in use');
      } else {
        alert('Registration failed. Please try again.'); // Generic error message
      }
    }
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: loginUserName,
          password: loginPassword,
        }),
      });

      if (response.ok) {
        // Login successful, handle the response
        const data = await response.json();
        console.log(data);
        // Reset the form fields
        // check if the resluted username = admin and password = admin123 then redirect it to the admin panel instead of the home page
        if (loginUserName === 'admin' && loginPassword === 'admin123') {
          window.location.href = '/AdminPanel';
        }
        else {
          window.location.href = '/HomePage';
        }
        setLoginUserName('');
        setLoginPassword('');
      } else {
        // Handle unsuccessful login
        console.log('Invalid credentials');
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error(error);
    }
  };


  const [action, setAction] = useState('');

  const HandleRegLink = (e) => {
    e.preventDefault(); // Prevent default anchor action
    setAction('active'); // Set the state to show the registration form
  };

  const HandleLoginLink = (e) => {
    e.preventDefault(); // Prevent default anchor action
    setAction(''); // Set the state to show the login form
  };

  return (
    <>
      <div className='LoginPage'>
        <div className={`wrapper ${action}`}>

          <div className="form-box login">
            <form action='' onSubmit={handleLogin}>
              <h1>Login</h1>

              <div className="input-box">
                <input id="UserName" type='text' placeholder='UserName' required value={loginUserName} onChange={e => setLoginUserName(e.target.value)}></input>
                <FaUser className='icon' />
              </div>

              <div className="input-box">
                <input id="Password" type='password' placeholder='Password' required value={loginPassword} onChange={e => setLoginPassword(e.target.value)}></input>
                <FaLock className='icon' />
              </div>
              <div className="Remember-forget">
                <label><input type='checkbox'></input>Remember me</label>
                <a href='#'>Forget Password?</a>
              </div>

              <button id="LoginData" type="submit">Login</button>

              <div className='register-link'>
                <p>Don't have an account?<a href='Register' onClick={(e) => HandleRegLink(e)}>Register!</a></p>
              </div>
            </form>
          </div>

          <div className="form-box register">
            <form action='' onSubmit={handleRegister}>
              <h1>Registration</h1>

              <div className="input-box">
                <input type='text' placeholder='UserName' required value={regUserName} onChange={e => setRegUserName(e.target.value)}></input>
                <FaUser className='icon' />
              </div>

              <div className="input-box">
                <input type='email' placeholder='Email' required value={regEmail} onChange={e => setRegEmail(e.target.value)}></input>
                <IoMail className='icon' />
              </div>

              <div className="input-box">
                <input type='password' placeholder='Password' required value={regPassword} onChange={e => setRegPassword(e.target.value)}></input>
                <FaLock className='icon' />
              </div>
              <select className="form-select" aria-label="Default select example" value={regCity} onChange={e => setRegCity(e.target.value)}>
                <option value="Gujranwala" selected >Gujranwala</option>
                <option value="Multan">Multan</option>
                <option value="Lahore">Lahore</option>
              </select>


              <button id="RegisterData" type="submit">Sign Up</button>


              <div className='register-link'>
                <p>Already have an account?<a href='#' onClick={(e) => HandleLoginLink(e)}>Login!</a></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}


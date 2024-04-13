import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Signup from './Signup.jsx'

const Login = () => {
    // basic login form, need to add onClick functionality obviously
    // need middleware and a database to make this functional
    const navigate = useNavigate();
    const navigateToSignup = () => {
        navigate('/signup');
    }

    return (
        <div className="form-container">
            <h2>Login</h2>
            <form>
                <input id="username" type="text" placeholder="Username" />
                <input id="password" type="password" placeholder="Password" />
                <button type="button">Login</button>
            </form>
            <p>Don't have an account? <button onClick={navigateToSignup}>Sign Up</button></p>
        </div>
    )
};

export default Login;
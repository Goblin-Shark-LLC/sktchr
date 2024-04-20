import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = (props) => {
    // basic login form, need to add onClick functionality obviously
    // need middleware and a database to make this functional
    const navigate = useNavigate();
    const navigateToSignup = () => {
        navigate('/signup');
    }

    const navigateToHome = () => {
        navigate('/home');
    }

    return (
        <div className="form-container">
            {/* <h2 className="form-header">Login</h2> */}
            {/* <p className="form-subtitle">Sign in with:</p> */}
            <div className="social-auth">
                <Link to="http://localhost:3000/auth/google" className="auth-link google">Authenticate with Google</Link>
                {/* Add more social authentication links if needed */}
            </div>
            {/* Optional: Add a link to navigate to the signup page */}
            {/* <p>Don't have an account? <button onClick={navigateToSignup}>Sign Up</button></p> */}
        </div>
    )
};

export default Login;
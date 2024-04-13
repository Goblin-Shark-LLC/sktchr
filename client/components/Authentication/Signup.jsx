// basic signup form which will need to be linked
// needs middleware and db functionality

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    // need to add functionality to tie this into our user database
    const navigate = useNavigate();
    const navigateToLogin = () => {
        navigate('/');
    }
    return (
        <div className="form-container">
            <h2>Sign up</h2>
            <form>
                <input id="username" type="text" placeholder="Username" />
                <input id="password" type="password" placeholder="Password" />
                <button type="button">Sign up</button>
            </form>
            <p>Already have an account? <button onClick={navigateToLogin}>Log in</button></p>
        </div>
    )
}

export default Signup;
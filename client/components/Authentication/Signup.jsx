// basic signup form which will need to be linked
// needs middleware and db functionality

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    // react hooks
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signupError, setSignupError] = useState(null);
    const [signupSuccess, setSignupSuccess] = useState(false);

    // requesting
    const handleSignup = () => {
        axios.post('/signup', { username, email, password })
            .then(response => {
                setSignupSuccess(true);
                setSignupError(null);
                navigateToLogin();
            })
            .catch(error => {
                setSignupError(error.response.data.error);
                setSignupSuccess(false);
            })
    }
    // need to add functionality to tie this into our user database
    const navigate = useNavigate();
    const navigateToLogin = () => navigate('/');

    return (
        <div className="form-container">
            <h2>Sign up</h2>
            {signupSuccess && <p>Signup successful!</p>}
            {signupError && <p>{signupError}</p>}
            <form>
                <input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
                <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                <button type="button" onClick={handleSignup}>Sign up</button>
            </form>
            <p>Already have an account? <button onClick={navigateToLogin}>Log in</button></p>
        </div>
    )
}

export default Signup;
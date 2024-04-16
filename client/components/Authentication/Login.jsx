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

    // const handleLogin = () => {
    //     fetch()
    // }
    // function isLoggedIn() {
    //     if(props.cookiePresent){
    //         return (
    //             <div>
    //                 You are Logged in!
    //             </div>
    //         )
    //     }
    //     else{
    //         return (
    //             <div>Login</div>
    //         )
    //     }
    // }
    return (
        <div className="form-container">
            <h2>Login</h2>
            <form>
                <input id="username" type="text" placeholder="Username" />
                <input id="password" type="password" placeholder="Password" />
                <button type="button" onClick={navigateToHome}>Login</button>
            </form>
            <Link to="http://localhost:3000/auth/google">Authenticate with Google</Link>
            <p>Don't have an account? <button onClick={navigateToSignup}>Sign Up</button></p>
        </div>
    )
};

export default Login;
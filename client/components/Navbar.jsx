import React from 'react';
import { Link } from 'react-router-dom';

// export const Navbar = (props) => {
//     // navLinks will want links to:
//     // main feed
//     // my profile
//     // log out button


export const Navbar = ({ isLoggedIn }) => {
    // Function to handle logout
    const handleLogout = () => {
        // Send a request to log out the user
        fetch('/auth/logout', {
            method: 'GET',
            credentials: 'include' // Include credentials to send cookies
        })
        .then(response => {
            if (response.ok) {
                // Redirect to the home page after logout
                window.location.href = '/';
            } else {
                console.error('Failed to log out');
            }
        })
        .catch(error => {
            console.error('Error during logout:', error);
        });
    };
    // console.log("Nav is logged in? ===> ", isLoggedIn);
    return (
        <nav>
            <section className="navSection">
                <h1>sktchr</h1>
                <div className="navContent">
                { isLoggedIn ? (
                    <div className="navLinks">
                        
                        <Link to="/"> Home </Link>
                        <Link to ='/my-profile'>My profile</Link>
                        <Link to ='/users'>Users</Link>
                        <Link to='/' onClick={handleLogout}>Log Out</Link>
                    </div>
                    ) : (<></>)}
                </div>
            </section>
        </nav>
    )
}
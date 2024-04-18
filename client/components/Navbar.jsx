import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = (props) => {
    // navLinks will want links to:
    // main feed
    // my profile
    // log out button
    console.log("Nav is logged in? ===> ", props.isLoggedIn);
    return (
        <nav>
            <section>
                <h1>sktchr</h1>
                <div className="navContent">
                { props.isLoggedIn ? (
                    <div className="navLinks">
                        
                        <Link to="/"> Posts </Link>
                        <Link to="/logout">Log Out</Link>
                    </div>
                    ) : (<></>)}
                </div>
            </section>
        </nav>
    )
}
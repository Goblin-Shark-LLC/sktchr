import React from 'react';
import Login from './components/Authentication/Login.jsx';
import Signup from './components/Authentication/Signup.jsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
    // will create routes to mainfeed and userprofile (maybe based on id or username)
    return (
    <Router>
        <div>
            <Routes>
                <>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                </>
            </Routes>
        </div>
    </Router>
    );
};

export default App;
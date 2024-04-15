import React from 'react';
import Login from './components/Authentication/Login.jsx';
import Signup from './components/Authentication/Signup.jsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PostsList } from './features/posts/PostsList.jsx';
import { AddPostForm } from './features/posts/AddPostForm.jsx';

function App() {
    // will create routes to mainfeed and userprofile (maybe based on id or username)
    // TODO: create conditionals based on user logged in or not
    // I think this could maybe be stored in state, renders can be conditional on that?
    // routing will be dependent on this
    return (
    <Router>
        <div className="App">
            <Routes>
                <>
                <Route 
                    path="/" 
                    element={
                        <React.Fragment>
                            <AddPostForm />
                            <PostsList />
                        </React.Fragment>} />
                <Route 
                    path="/signup" 
                    element={
                        <Signup />
                    } />
                {/* <Route path="/login" element={< Login />} /> */}
                </>
            </Routes>
        </div>
    </Router>
    );
};

export default App;
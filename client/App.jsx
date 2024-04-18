import React, { useEffect, useState } from 'react';
import Login from './components/Authentication/Login.jsx';
import Signup from './components/Authentication/Signup.jsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PostsList } from './features/posts/PostsList.jsx';
import { AddPostForm } from './features/posts/AddPostForm.jsx';
import { SinglePostPage } from './features/posts/SinglePostPage.jsx';
import { EditPostForm } from './features/posts/EditPostForm.jsx';
import { Navbar } from './components/Navbar.jsx';
import Cookies from 'js-cookie';

function App() {
    // on app render, update userObj to null
    const [cookiePresent, setCookiePresent] = useState(false);
    const [userObj, setUserObj] = useState(null);
    // will create routes to mainfeed and userprofile (maybe based on id or username)
    // TODO: create conditionals based on user logged in or not
    // I think this could maybe be stored in state, renders can be conditional on that?
    // routing will be dependent on this
    useEffect(() => {
        let cookie = Cookies.get('isLoggedIn');
        console.log(`cookie: ${JSON.stringify(cookie)}`);
        if(cookie === 'true'){
            console.log('cookie true');
            setCookiePresent(true);
        } else {
            console.log('cookie false')
            setCookiePresent(false);
        }
    })

    useEffect(() => {
        async function fetchUser() {
            setUserObj(await fetch('/getUser'));
        }
        if(cookiePresent){
            fetchUser();
        }
    },[cookiePresent]);

    return (
    <Router>
        {/* <Canvas /> */}
        <Navbar />
        <div className="App">
            <Routes>
                {cookiePresent ? (
                <>
                <Route 
                    path="/" 
                    element={
                        <React.Fragment>
                            <AddPostForm />
                            <PostsList />
                        </React.Fragment>} 
                />
                <Route
                    path="/posts/:postId"
                    element={<SinglePostPage />}
                />
                <Route
                    path="/editPost/:postId"
                    element={<EditPostForm />}
                /></>
                    ) : (
                <>
                <Route 
                    path="/signup" 
                    element={
                        <Signup />
                    } />
                <Route path="/" element={< Login />} />
                </>)}
            </Routes>
        </div>
    </Router>
    );
};

export default App;
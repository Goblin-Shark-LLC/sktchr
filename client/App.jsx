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
import Canvas from './Canvas.jsx';

function App() {
    // on app render, update userObj to null
    const [cookiePresent, setCookiePresent] = useState(false);
    const [userObj, setUserObj] = useState(null);

    useEffect(() => {
        let cookie = Cookies.get('isLoggedIn');
        if(cookie === 'true'){
            setCookiePresent(true);
        } else {
            setCookiePresent(false);
        }
    })

    useEffect(() => {
        async function fetchUser() {
            await fetch('/getUser')
                .then(response =>  {
                    if(!response.ok){
                        console.error('Network response not ok.')
                    }
                    return response.json()
                })
                .then(user =>setUserObj(user))
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
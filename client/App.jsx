import React, { useEffect, useState } from 'react';
import Login from './components/Authentication/Login.jsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar.jsx';
import Cookies from 'js-cookie';
import Canvas from './Canvas.jsx';
import { PostsList } from './features/posts/PostsList.jsx';
// import UsersList from './features/users/UsersList.jsx'
// import UserProfile from './features/users/UserProfile.jsx';

function App() {
    // on app render, update userObj to null
    const [cookiePresent, setCookiePresent] = useState(false);
    const [userObj, setUserObj] = useState(null);

    useEffect(() => {
        let cookie = Cookies.get('isLoggedIn');
        // console.log(`cookie: ${JSON.stringify(cookie)}`);
        // console.log("user obj ====> ", userObj);

        if(cookie === 'true'){
            // console.log('cookie true');
            setCookiePresent(true);
        } else {
            // console.log('cookie false')
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
            // console.log("user obj ===> ", userObj);

        }
    },[cookiePresent]);

    return (
    <Router>
        <Navbar />
        {/* <Canvas /> */}
        <Navbar />
        <div className="App">
            <Navbar isLoggedIn={cookiePresent}/>
            <Routes>
                {cookiePresent ? (
                <>
                <Route 
                    path="/" 
                    element={
                        <div className="mainContent">
                             <Canvas/>
                            <PostsList />
                        </div>} 
                />
                {/* <Route
                    path="/posts/:postId"
                    element={<SinglePostPage />}
                />
                <Route
                    path="/editPost/:postId"
                    element={<EditPostForm />}
                /> */}
                {/* <Route
                    path="/users"
                    // element={<UsersList />}
                />
                <Route
                    path="/my-profile"
                    element={<UserProfile />}
            />*/}</>
                    ) : (
                <>
                {/* <Route 
                    path="/signup" 
                    element={
                        <Signup />
                    } /> */}
                <Route path="/" element={< Login />} />
                </>)}
            </Routes>
        </div>
    </Router>
    );
};

export default App;
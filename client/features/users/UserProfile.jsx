// Assuming this component handles authentication and dispatches setCurrentUser action after successful authentication
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from './usersSlice';

const UserProfile = ({ user }) => {
    const dispatch = useDispatch();
    console.log("user ====> ", user);

    useEffect(() => {
        // Dispatch setCurrentUser action after successful authentication
        dispatch(setCurrentUser(user));
    }, [dispatch, user]);

    // Render authenticated component content
    return (
        <div>
            <h2>Welcome, {user}!</h2>
            {/* Other authenticated component content */}
        </div>
    );
};

export default UserProfile;

import React from 'react';
import { useSelector } from 'react-redux';

// showing the name of author in posts
// currently using dummy users
// takes userId as prop, looks up the right user and displays name

// any component can use useSelector hook to extract the specific pieces of data it needs

export const PostAuthor = ({ userId }) => {
    const author = useSelector(state => {
    console.log("state users ===> ", state.users)
    console.log("user id ===> ", userId);
    state.users.find(user => user['_id'] === userId)
});
    return <span>by {author ? author.name : 'Unknown author'}</span>
}
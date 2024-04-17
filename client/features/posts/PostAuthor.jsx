import React from 'react';
import { useSelector } from 'react-redux';

// showing the name of author in posts
// currently using dummy users
// takes userId as prop, looks up the right user and displays name

// any component can use useSelector hook to extract the specific pieces of data it needs

export const PostAuthor = ({ userId }) => {
    const author = useSelector(state =>
    state.users.find(user => user.id === userId)
    );
    return <span>by {author ? author.name : 'Unknown author'}</span>
}
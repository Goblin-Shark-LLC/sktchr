import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// nanoid generates random number id
import { nanoid } from '@reduxjs/toolkit';
import { postAdded } from './postsSlice';

// dummy add post component

export const AddPostForm = () => {

    // useState hooks to keep track of title and content input values
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    // useState hook for dummy user input (eventually will be linked to whoever is logged in)
    // we need a fetch request for userID to correspond to logged in user
    const [userId, setUserId] = useState('');

    const dispatch = useDispatch();

    // get dummy list of users from store
    const users = useSelector(state => state.users)
    console.log("users ===> ", users);

    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e => setContent(e.target.value);
    const onAuthorChanged = e => setUserId(e.target.value);
    // when clicking on "Save Post", if all fields are good,
    // we should dispatch our postAdded action with new title and content
    // & update the store
    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(postAdded(title, content, userId));
            // reset input fields to empty strings
            setTitle('');
            setContent('');
        }
    }


    // post request
    // we need from postSchema: url (img)
    const addPost = async () => {
        console.log("form data ===> ", { title, content });
        fetch('/addPost', {
            method: 'POST',
            body: JSON.stringify(title),
        })
        .then(res => res.json())
        .then(data => {
            console.log("we are in addPost, data ===> ", data);
        })
        .catch(err => console.log('addPost fetch request error ===>', err))
    };

    // adding functionality where we can only click Save if all input fields have text
    const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

    // creating a drop down menu to pick a user for now (dummy)
    const usersOptions = users.map(user => {
        return (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
        )
    });

    console.log("usersOptions ===> ", usersOptions);

    return (
        <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {usersOptions}
                </select>
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button type="button" onClick={onSavePostClicked} disabled={!canSave}>Save Post</button>
                <button type="button" onClick={addPost}>Test Post</button>
            </form>
        </section>
    )
}
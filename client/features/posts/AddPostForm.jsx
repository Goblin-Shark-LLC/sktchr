import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// nanoid generates random number id
import { nanoid } from '@reduxjs/toolkit';
import { postAdded } from './postsSlice';

// dummy add post component

export const AddPostForm = () => {

    // useState hooks to keep track of title and content input values
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const dispatch = useDispatch();

    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e => setContent(e.target.value);

    // when clicking on "Save Post", if all fields are good,
    // we should dispatch our postAdded action with new title and content
    // & update the store
    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(
                postAdded({
                    id: nanoid(),
                    title,
                    content
                })
            )
            // reset input fields to empty strings
            setTitle('');
            setContent('');
        }
    }

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
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button type="button" onClick={onSavePostClicked}>Save Post</button>
            </form>
        </section>
    )
}
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postUpdated } from './postsSlice';
import { useParams } from 'react-router-dom';

// similar to Add Post but slightly different logic
// we need to retrieve the post obj from the store via ID
export const EditPostForm = () => {
    const { postId } = useParams();
    console.log("Inside edit postId ===> ", postId);

    // retrieving post based on corresponding ID
    const post = useSelector(state =>
        state.posts.find(post => post.id === postId)
    );
    console.log("Inside edit post (before edit) ===> ", post);

    // using hooks just like Add Post but this time with existing title and content
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e => setContent(e.target.value);

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(postUpdated({ id: postId, title, content }));
            navigate(`/posts/${postId}`);
        }
    }

    return (
        <section>
            <h2>Edit Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    placeholder="What's on your mind?"
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
            </form>
            <button type="button" onClick={onSavePostClicked}>
                Save Post
            </button>
        </section>
    )
} 

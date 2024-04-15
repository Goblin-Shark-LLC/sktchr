import React from 'react';
import { useSelector } from 'react-redux';

// useSelector enables us to read data from the Redux store
// the selector funcs will be called with the entire Redux state object as a parameter
// & should return the specific data that this component needs from the store

export const PostsList = () => {
    // select posts from our store
    const posts = useSelector(state => {
        console.log('Redux State ===> ', state);
        return state.posts;
});
    // loop through our array of posts
    // & show each one
    const renderedPosts = posts.map(post => {
        return(
        <div className="post-excerpt" key={post.id}>
            <h3>{post.title}</h3>
            <p className="post-content">{post.content.substring(0, 100)}</p>
        </div>)
    });

    return (
        <section className="posts-list">
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    )
}
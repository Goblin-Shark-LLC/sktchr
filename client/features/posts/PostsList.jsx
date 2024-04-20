import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PostAuthor } from './PostAuthor.jsx';
import { TimeAgo } from './TimeAgo.jsx';
import { ReactionButtons } from './ReactionButtons.jsx';

// useSelector enables us to read data from the Redux store
// the selector funcs will be called with the entire Redux state object as a parameter
// & should return the specific data that this component needs from the store

export const PostsList = () => {
    // select posts from our store
    const posts = useSelector(state => {
        // console.log('Redux State ===> ', state);
        return state.posts;
    });



    // here we want to do a fetch request with specific userID and posts, createdAt/maybe updatedAt
    // need to get data from db


    // sort posts in reverse chronological order by datetime string
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));

    // loop through our array of posts
    // & show each one
    const renderedPosts = orderedPosts.map(post => {
        return(
        <article className="post-excerpt" key={post.id}>
            <h3>{post.title}</h3>
            <div>
                <PostAuthor userId={post.user} />
                <TimeAgo timestamp={post.date} />
            </div>
            <p className="post-content">{post.content.substring(0, 100)}</p>
            <ReactionButtons post={post} />
            <Link to={`/posts/${post.id}`} className="button muted-button">
                View Post
            </Link>
        </article>)
    });

    return (
        <section className="posts-list">
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    )
}
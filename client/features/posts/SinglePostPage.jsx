import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// useParams uses the route's dynamic parameters (defined here in PostsList when clicking the button)
// in this case it will be post.id
import { useParams } from 'react-router-dom';


export const SinglePostPage = () => {
    // declaring our variable postId which is used in router
    const { postId } = useParams();
    console.log("postId ===> ", postId);

    // we need to look for the post which corresponds to the ID
    const post = useSelector(state =>
        state.posts.find(post => post.id === postId)
    );

    console.log("post ===> ", post);

    // error handle but not sure if necessary
    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    // rendering the corresponding post
    return (
        <section>
            <article className="post">
                <h2>{post.title}</h2>
                <p className="post-content">{post.content}</p>
                <Link to={`/editPost/${post.id}`} className="button">
                Edit Post</Link>
            </article>
        </section>
    )
}
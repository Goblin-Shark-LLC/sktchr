import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { PostAuthor } from './PostAuthor.jsx';
import { TimeAgo } from './TimeAgo.jsx';
import { ReactionButtons } from './ReactionButtons.jsx';
// import { fetchPosts } from './postsSliceTest.js'

// useSelector enables us to read data from the Redux store
// the selector funcs will be called with the entire Redux state object as a parameter
// & should return the specific data that this component needs from the store

export const PostsList = (props) => {
    // const dispatch = useDispatch();
    // select posts from our store
    // console.log('state:', state);
    let newPosts = [];

    useEffect(() => {
        fetch('/posts/getPosts')
        .then(data => data.json())
        .then(json => {
            console.log(json)
            newPosts = json
            props.setPosts(newPosts)
        })
    },[])
    useEffect(() => {
    },[props.posts])
        
    // props.setPosts(newPosts);
    // let loading;
    // let error;
    // useSelector(state => {
    //     posts = state.posts.posts
    // })

    // console.log('posts:',posts);

    // props.setPosts(posts);
    // const { posts, createdBy, createdAt } = useSelector(state => state.posts);
        // posts = state.posts.posts;
        // loading = state.posts.loading;
        // error = state.posts.error;
    //     console.log('Redux State ===> ', state.posts);
    //     return state.posts;
    // });
    // // fetchPosts()
    // useEffect(() => {
    //     dispatch(fetchPosts());

    // }, [dispatch]);
    
    // useEffect(()=>{

    // }, [posts]);

    // const posts = fetchPosts();
    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    // if (error) {
    //     return <div>Error: {error}</div>
    // }



    // here we want to do a fetch request with specific userID and posts, createdAt/maybe updatedAt
    // need to get data from db


    // sort posts in reverse chronological order by datetime string
    // const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));

    // loop through our array of posts
    // & show each one

    // useEffect(() => {
    //     renderedPosts
    // }, [posts]);

    // const TEST = fetchPosts();
    
    const renderedPosts = props.posts.map(post => {
        if(post){
            return(
                <article className="post-excerpt">
                    <h3>{post.title}</h3>
                    <div>
                        {/* <PostAuthor userId={post.createdBy} />*/}
                        {/* <TimeAgo timestamp={post.createdAt} /> */}
                    </div>
                    <img src={post.url}></img>
                    {/* <p className="post-content">{post.url}</p> */}
                    {/* <ReactionButtons post={post} /> */}
                    {/* <Link to={`/posts/${post.id}`} className="button muted-button">
                        View Post
                    </Link> */}
                </article>)
        }
        else{
            return <div>is anything actually being shown from this file</div>
        }

    });

    return (
        <section className="posts-list">
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    )
}
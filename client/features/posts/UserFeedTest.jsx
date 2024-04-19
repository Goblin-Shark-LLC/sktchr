import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../reducers/postsSliceTest';

const UserPosts = ({ userId }) => {
    const dispatch = useDispatch();
    const { posts, loading, error } = useSelector(state => state.posts);

    useEffect(() => {
        dispatch(fetchPosts(userId));
    }, [dispatch, userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>User Posts</h2>
            <ul>
                {posts.map(post => (
                    <li key={post._id}>{post.content}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserPosts;

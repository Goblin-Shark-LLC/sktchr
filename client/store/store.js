import { configureStore } from '@reduxjs/toolkit';
// import { composeWithDevTools } from '@redux-devtools/extension';
import postsReducer from '../features/posts/postsSlice.js';

// configuring our store so that the posts reducer is being passed as a reducer field named posts
// all the data for state.posts will be updated by the postsReducer func when actions are being dispatched

export const store = configureStore({
    reducer: {
        posts: postsReducer
    },
});
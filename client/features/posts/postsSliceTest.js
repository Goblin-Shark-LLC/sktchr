import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// nanoid create unique IDs
import { nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import axios from 'axios';


// creating a dummy initial state for now
// going to add dummy users/authors for now (relating to userId in our usersSlice)
// eventually will need to define a state.currentUser based on logged in user

const initialState = {
    posts: [],
    loading: false,
    error: null
}

// export const fetchPosts =  createAsyncThunk(
//     'posts/getPosts',
//     async () => {
//         const response = await axios.get('/posts/getPosts');
//         console.log("res in postsSlice test ===> ", response.data);
//         return response.data;
//     }
// )



// when writing reducers, createSlice will automatically generate an action creator func with same name
const postsSliceTest = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        // action/reducer for adding a post
        postAdded: {
            reducer(state, action) {
                state.posts.push(action.payload);
            },
            prepare( content, userId) {
                return {
                    payload: {
                        // id: nanoid(),
                        date: new Date().toISOString(),
                        // title,
                        content,
                        // reactions: {thumbsUp: 0, hooray: 0, heart: 0},
                        user: userId
                    }
                }
            }
        },
        // action/reducer for updating a post
        // postUpdated(state, action) {
        //     const { content } = action.payload;
        //     const existingPost = state.posts.find(post => post.id === id);
        //     if (existingPost) {
        //         existingPost.title = title;
        //         existingPost.content = content;
        //     }
        // },
        // action/reducer for clicking on a reaction
        // will increment the specific reaction count
        // reactionAdded(state, action) {
        //     const { postId, reaction } = action.payload;
        //     const existingPost = state.posts.find(post => post.id === postId);
        //     if (existingPost) {
        //         existingPost.reactions[reaction]++;
        //     }
        // },
        fetchPostsRequest(state){
            state.loading = true;
            state.error = null;
        },
        fetchPostsSuccess(state, action) {
            state.loading = false;
            state.posts = action.payload;
        },
        fetchPostsFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

// exporting action creator which should be dispatched when user clicks "Save Post"
export const { postAdded, postUpdated, reactionAdded, fetchPostsFailure, fetchPostsRequest, fetchPostsSuccess } = postsSliceTest.actions;

export default postsSliceTest.reducer;
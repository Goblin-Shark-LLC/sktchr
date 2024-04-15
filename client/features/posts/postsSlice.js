import { createSlice } from '@reduxjs/toolkit';
// nanoid create unique IDs
import { nanoid } from '@reduxjs/toolkit';


// creating a dummy initial state for now

const initialState = [
    { id: '1', title: 'First Post!', content: 'Hello!'},
    { id: '2', title: 'Second Post', content: 'Blabla'}
]

// when writing reducers, createSlice will automatically generate an action creator func with same name
const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.push(action.payload);
            },
            prepare(title, content) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content
                    }
                }
            }
        },
        postUpdated(state, action) {
            const { id, title, content } = action.payload;
            const existingPost = state.find(post => post.id === id);
            if (existingPost) {
                existingPost.title = title;
                existingPost.content = content;
            }
        }
    }
})

// exporting action creator which should be dispatched when user clicks "Save Post"
export const { postAdded, postUpdated } = postsSlice.actions;

export default postsSlice.reducer;
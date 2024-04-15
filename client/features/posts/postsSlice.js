import { createSlice } from '@reduxjs/toolkit';

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
        postAdded(state, action) {
            state.push(action.payload);
        }
    }
})

// exporting action creator which should be dispatched when user clicks "Save Post"
export const { postAdded } = postsSlice.actions;

export default postsSlice.reducer;
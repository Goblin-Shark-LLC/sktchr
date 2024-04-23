// import { createSlice } from '@reduxjs/toolkit';

// dummy userbase

// const initialState = [
//     { id: '0', name: 'Josh'},
//     { id: '1', name: 'Max' },
//     { id: '2', name: 'Sameer' },
//     { id: '3', name: 'Alex'}
// ]

// const usersSlice = createSlice({
//     name: 'users',
//     initialState,
//     reducers: {}
// })

// export default usersSlice.reducer;

// slices/usersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch users
export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        const response = await axios.get('/api/users');
        console.log("res in usersSlice ===> ", response);
        return response.data;
    }
);

const initialState = [];

const usersSlice = createSlice({
    name: 'users',
    initialState,
    // reducers: {
    //     setCurrentUser(state, action) {
    //         state.currentUser = action.payload;
    //     }
    // },
    // extraReducers: builder => {
    //     builder
    //         .addCase(fetchUsers.pending, state => {
    //             state.loading = true;
    //             state.error = null;
    //         })
    //         .addCase(fetchUsers.fulfilled, (state, action) => {
    //             state.loading = false;
    //             state.users = action.payload;
    //         })
    //         .addCase(fetchUsers.rejected, (state, action) => {
    //             state.loading = false;
    //             state.error = action.error.message;
    //         });
    // }
});

export const { setCurrentUser } = usersSlice.actions;
export default usersSlice.reducer;

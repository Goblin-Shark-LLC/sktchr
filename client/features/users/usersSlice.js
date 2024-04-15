import { createSlice } from '@reduxjs/toolkit';

// dummy userbase

const initialState = [
    { id: '0', name: 'Josh'},
    { id: '1', name: 'Max' },
    { id: '2', name: 'Sameer' },
    { id: '3', name: 'Alex'}
]

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}
})

export default usersSlice.reducer;
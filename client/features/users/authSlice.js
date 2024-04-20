// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// // not sure if token needed?
// const initialState = {
//     user: null,
//     error: "",
//     loading: false,
//     // token: null,
//     // posts: [],
// };

// export const login = createAsyncThunk("auth/login", async() => {
//     try {
        
//     }
//     catch (err) {
//         console.log(err);
//     }
// })

// const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {
//         setLogin: (state, action) => {
//             state.user = action.payload.user;
//             state.token = action.payload.token;
//         },
//         setLogout: (state) => {
//             state.user = null;
//             state.token = null;
//         },
//         setPosts: (state, action) => {
//             state.posts = action.payload.posts;
//         }
//     }
// });

// export default authSlice.reducer;
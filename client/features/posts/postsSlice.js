// import { createSlice } from '@reduxjs/toolkit';
// // nanoid create unique IDs
// import { nanoid } from '@reduxjs/toolkit';
// import { sub } from 'date-fns';


// // creating a dummy initial state for now
// // going to add dummy users/authors for now (relating to userId in our usersSlice)
// // eventually will need to define a state.currentUser based on logged in user

// const initialState = [
//     { id: '1', 
//     title: 'First Post!', 
//     content: 'Hello!', 
//     user: '1', 
//     date: sub(new Date(), { minutes: 10}).toISOString(),
//     reactions: {thumbsUp: 0, hooray: 0, heart: 0}
//     },

//     { id: '2', 
//     title: 'Second Post', 
//     content: 'Blabla', 
//     user: '2', 
//     date: sub(new Date(), { minutes: 5}).toISOString(),
//     reactions: {thumbsUp: 0, hooray: 0, heart: 0}
//     }
// ]

// // when writing reducers, createSlice will automatically generate an action creator func with same name
// const postsSlice = createSlice({
//     name: 'posts',
//     initialState,
//     reducers: {
//         // action/reducer for adding a post
//         postAdded: {
//             reducer(state, action) {
//                 state.push(action.payload);
//             },
//             prepare(title, content, userId) {
//                 return {
//                     payload: {
//                         id: nanoid(),
//                         date: new Date().toISOString(),
//                         title,
//                         content,
//                         reactions: {thumbsUp: 0, hooray: 0, heart: 0},
//                         user: userId
//                     }
//                 }
//             }
//         },
//         // action/reducer for updating a post
//         postUpdated(state, action) {
//             const { id, title, content } = action.payload;
//             const existingPost = state.find(post => post.id === id);
//             if (existingPost) {
//                 existingPost.title = title;
//                 existingPost.content = content;
//             }
//         },
//         // action/reducer for clicking on a reaction
//         // will increment the specific reaction count
//         reactionAdded(state, action) {
//             const { postId, reaction } = action.payload;
//             const existingPost = state.find(post => post.id === postId);
//             if (existingPost) {
//                 existingPost.reactions[reaction]++;
//             }
//         }
//     }
// })

// // exporting action creator which should be dispatched when user clicks "Save Post"
// export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;

// export default postsSlice.reducer;
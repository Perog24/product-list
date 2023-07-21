import { createSlice } from "@reduxjs/toolkit";
import { getDataApi } from "../../api/fetchApi";

const ipiSlice = createSlice({
   name: "api",
   initialState: {
      users: [],
      posts: [],
      comments: []
   },
   reducers: {
      getAsyncUsers: (state, action) => {state.users = action.payload;},
      getAsyncPosts: (state, action) => {state.posts = action.payload},
      getAsyncComments: (state, action) => {state.comments = action.payload}
   },
});

export const {getAsyncUsers, getAsyncPosts, getAsyncComments} = ipiSlice.actions;

export const getUsers = () => dispatch => {
   getDataApi("https://jsonplaceholder.typicode.com/users")
   .then(data => {
      return dispatch(getAsyncUsers(data));
      })
}

export const getPosts = () => dispatch => {
   getDataApi("https://jsonplaceholder.typicode.com/posts")
   .then(data => {
      return dispatch(getAsyncPosts(data));
      })
}

export const getComments = () => dispatch => {
   getDataApi("https://jsonplaceholder.typicode.com/comments")
   .then(data => {
      return dispatch(getAsyncComments(data));
      })
}

export default ipiSlice.reducer; 
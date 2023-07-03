import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  posts: [],
  // Mode specific settings //
  mode: "light",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    //  login state //
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    //  logout state //
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    //  add friends state //
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.log("Invalid user");
      }
    },
    //  posts state //
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

// ToolKit specific methods //
export const { setModel, setFriends, setLogin, setLogout, setPosts, setPost } =
  authSlice.actions;
export default authSlice.reducer;

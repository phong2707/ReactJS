import { createSlice, isFulfilled, isPending, isRejected  } from "@reduxjs/toolkit";
import { fetchPosts, addPost, updatePost, deletePost } from "./postThunk";
import type { Post } from "../types/post";

interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(
          (p) => p.id !== action.payload
        );
      })
      .addMatcher(
        isPending(fetchPosts, addPost, updatePost, deletePost),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addMatcher(
        isFulfilled(fetchPosts, addPost, updatePost, deletePost),
        (state) => {
          state.loading = false;
        }
      )
      .addMatcher(
        isRejected(fetchPosts, addPost, updatePost, deletePost),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message || "Có lỗi xảy ra";
        }
      );
  },
});

export default postSlice.reducer;

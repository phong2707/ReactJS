import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Post } from "../types/post";

const API = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = createAsyncThunk(
  "posts/fetch",
  async () => {
    const res = await axios.get<Post[]>(API);
    return res.data.slice(0, 10);
  }
);

export const addPost = createAsyncThunk(
  "posts/add",
  async (data: { title: string; body: string }) => {
    const res = await axios.post<Post>(API, {
      ...data,
      userId: 1,
    });

    return {
      ...res.data,
      id: Date.now(),
      isLocal: true,
    };
  }
);


export const updatePost = createAsyncThunk(
  "posts/update",
  async (post: Post) => {
    if (!post.isLocal) {
      await axios.put(`${API}/${post.id}`, post);
    }
    return post;
  }
);

export const deletePost = createAsyncThunk(
  "posts/delete",
  async (id: number) => {
    await axios.delete(`${API}/${id}`);
    return id;
  }
);

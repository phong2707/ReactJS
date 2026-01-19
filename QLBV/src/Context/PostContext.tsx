import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export type Post = {
  id: number;
  title: string;
  body: string;
  userId?: number;
  isLocal?: boolean;
};

type PostContextType = {
  posts: Post[];
  addPost: (post: Post) => void;
  updatePost: (post: Post) => void;
  deletePost: (id: number) => void;
};

const PostContext = createContext<PostContextType | null>(null);

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  // GET POSTS
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(res => setPosts(res.data.slice(0, 10)));
  }, []);

  // ADD
  const addPost = (post: Post) => {
    setPosts(prev => [post, ...prev]);
  };

  // UPDATE
  const updatePost = (updated: Post) => {
    setPosts(prev =>
      prev.map(p => (p.id === updated.id ? updated : p))
    );
  };

  // DELETE
  const deletePost = (id: number) => {
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <PostContext.Provider
      value={{ posts, addPost, updatePost, deletePost }}
    >
      {children}
    </PostContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePosts must be used inside PostProvider");
  }
  return context;
};

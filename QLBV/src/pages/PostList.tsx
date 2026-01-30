import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, deletePost } from "../redux/postThunk";
import type { RootState, AppDispatch } from "../redux/store";
import { Link } from "react-router-dom";

export default function PostList() {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading } = useSelector((state: RootState) => state.posts);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
  if (posts.length === 0) {
    dispatch(fetchPosts());
  }
}, [dispatch, posts.length]);


  if (loading) return <p>Loading...</p>;

  return (
    <>
      <h2>Danh sách bài viết</h2>

    {isLoggedIn && (
      <button className="btn-them">
        <Link to="/new">➕ Thêm bài viết</Link>
      </button>
    )}
      {posts.map(post => (
        <div key={post.id} className="postItem">
          <h4>{post.title}</h4>
          <p>{post.body}</p>

          {isLoggedIn && (
            <>
              <button className="btn-sua"><Link to={`/${post.id}/edit`}>Chi tiết</Link></button>
              <button type="button" className="btn-xoa" onClick={() => dispatch(deletePost(post.id))}>
                Xóa
              </button>
            </>
          )}
        </div>
      ))}
    </>
  );
}

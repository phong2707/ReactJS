import { Link } from "react-router-dom";
import { usePosts } from "../Context/PostContext";

function PostList() {
  const { posts, deletePost } = usePosts();

  return (
    <>
      <h2>Danh sách bài viết</h2>

      {posts.map(post => (
        <div key={post.id} className="post">
          <h4>{post.title}</h4>
          <p>{post.body}</p>

          <button><Link to={`/edit/${post.id}`}>Chi tiết</Link>{" "}</button>
          <button onClick={() => deletePost(post.id)}>Xóa</button>
        </div>
      ))}
    </>
  );
}

export default PostList;

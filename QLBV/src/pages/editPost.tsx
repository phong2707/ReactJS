import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePosts } from "../Context/PostContext";
import { useState, useEffect } from "react";
import axios from "axios";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, updatePost } = usePosts();

  const post = posts.find(p => p.id === Number(id));

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (post) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  if (!post) return <p>Không tìm thấy bài viết</p>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 🔥 Nếu bài từ API thật → PUT
    if (!post.isLocal) {
      await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${post.id}`,
        { title, body }
      );
    }

    // 🔥 Cập nhật STATE (QUAN TRỌNG NHẤT)
    updatePost({
      ...post,
      title,
      body,
    });

    alert("Cập nhật thành công");
    navigate("/");
  };

  return (
    <div className="form">
      <h2>Sửa bài viết</h2>

      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <textarea
          value={body}
          onChange={e => setBody(e.target.value)}
        />

        <button>Cập nhật</button>
      </form>
    </div>
  );
}

export default EditPost;

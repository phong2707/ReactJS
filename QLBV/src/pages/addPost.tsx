import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../Context/PostContext";

function AddPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();
  const { addPost } = usePosts();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !body) {
      alert("Vui lòng nhập đủ thông tin");
      return;
    }

    // Gọi API (mock)
    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      { title, body, userId: 1 }
    );

    // 🔥 QUAN TRỌNG: TẠO ID LOCAL
    const newPost = {
      ...res.data,
      id: Date.now(),    
      isLocal: true,         
    };

    addPost(newPost);

    alert("Thêm bài viết thành công");
    navigate("/");
  };

  return (
    <div className="form">
      <h2>Thêm bài viết</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Tiêu đề"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Nội dung"
          value={body}
          onChange={e => setBody(e.target.value)}
        />

        <button>Thêm</button>
      </form>
    </div>
  );
}

export default AddPost;

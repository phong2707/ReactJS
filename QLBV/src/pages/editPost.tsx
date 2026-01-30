import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { updatePost } from "../redux/postThunk";
import type { AppDispatch } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import type { Post } from "../types/post";

function EditPost() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const post = useSelector((state: { posts: { posts: Post[]; }; }) =>
    state.posts.posts.find((p: { id: number; }) => p.id === Number(id))
  );

  const [form, setForm] = useState(() => ({
    title: post?.title || "",
    body: post?.body || "",
  }));


  // Đổ dữ liệu vào for
  useEffect(() => {
    if (post) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        title: post.title,
        body: post.body,
      });
    }
  }, [post]);

  // Nếu không có post → quay về list
  if (!post) {
    return <p>Không tìm thấy bài viết</p>;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedPost: Post = {
      ...post,
      title: form.title,
      body: form.body,
    };

    dispatch(updatePost(updatedPost));
    navigate("/");
  };

  return (
    <div>
      <h2>Sửa bài viết</h2>

      <form onSubmit={handleSubmit}>
    
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Tiêu đề"
            required
          />
    

      
          <textarea
            name="body"
            value={form.body}
            onChange={handleChange}
            placeholder="Nội dung"
            required
          />
  

        <button type="submit">Lưu</button>
      </form>
    </div>
  );
}

export default EditPost;


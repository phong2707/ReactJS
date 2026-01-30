import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../redux/postThunk";
import type { AppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const submit = async () => {
    await dispatch(addPost({ title, body }));
    navigate("/");
  };

  return (
    <>
      <h2>Add Post</h2>
      <form action="">
        <input onChange={e => setTitle(e.target.value)} type="text" placeholder="Title" />
      <textarea onChange={e => setBody(e.target.value)} placeholder="Body" name="" id="" />
      <button type="button" onClick={submit}>Thêm</button>
      </form>
    </>
  );
}

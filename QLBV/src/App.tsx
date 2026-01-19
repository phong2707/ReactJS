import { Routes, Route, Link } from "react-router-dom";
import PostList from "./pages/PostList";
import AddPost from "./pages/addPost";
import EditPost from "./pages/editPost";
import './App.css'

function App() {
  return (
    <div className="container">
      <nav style={{ marginBottom: 20 }}>
        <Link to="/">Home</Link> |{" "}
        <Link to="/add">Thêm bài</Link>
      </nav>

      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/add" element={<AddPost />} />
        <Route path="/edit/:id" element={<EditPost />} />
      </Routes>
    </div>
  );
}

export default App;

import { useSelector, useDispatch } from "react-redux";
import { logout } from "./redux/authSlice";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import PostList from "./pages/PostList";
import AddPost from "./pages/addPost";
import Login from "./pages/login";

import EditPost from "./pages/editPost";

import "./App.css";


function App() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { isLoggedIn, user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="container">
      <nav className="nav">
        <div className="nav-links">
          <Link to="/" style={{
            textDecoration: "none", fontSize: "28px" , color: "red"
          }}>POSTPAGE</Link>
          
        </div>
            {/* {isLoggedIn && <Link style={{
              textDecoration: "none", fontSize: "22px" , color: "black", textTransform: "uppercase"  
            }} to="/add">THêm bài viết</Link>} */}
        <div className="user">
          {!isLoggedIn ? (
            <Link to="/login">
              <button className="btn-login">Login</button>
            </Link>
          ) : (
            <div className="dropdown">
              <span style={{
                marginRight: "10px",
                font: "24px"
              }}>{user.username}</span>
              <img src={user.avatar} className="user-avatar" />
              <div className="dropdown-content">
                <Link to={`/edit/${user.id}`}>Profile</Link>

                <button onClick={() => dispatch(logout())} className="btn-loguot">Logout</button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={<PostList />}
        />
        <Route
          path="/new"
          element={isLoggedIn ? <AddPost /> : <Navigate to="/login" />}
        />
        <Route
          path="/:id/edit"
          element={isLoggedIn ? <EditPost /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
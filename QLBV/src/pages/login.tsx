import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import users from "../data/users.json";
import type { User } from "../types/User";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = (users as unknown as User[]).find(
      u => u.username === username && u.password === password
    );

    if (!user) {
      alert("Sai tài khoản hoặc mật khẩu");
      return;
    }

    dispatch(loginSuccess(user));
    navigate("/");
  };

  return (
    <div className="login">
      <h2>Login</h2>

      <div className="form-group-login">
        <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
            <button onClick={handleLogin}>Đăng nhập</button>
      </div>
    </div>
  );
}

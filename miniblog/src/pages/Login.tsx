import { useState } from "react";
import type { FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from || "/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // chặn reload trang

    if (!username.trim() || !password.trim()) {
      setError("Vui lòng nhập đầy đủ tài khoản và mật khẩu");
      return;
    }

    const ok = login(username.trim(), password);
    if (ok) {
      navigate(from, { replace: true });
    } else {
      setError("Sai tài khoản hoặc mật khẩu");
    }
  };

  return (
    <div className="form-box">
      <h1>Đăng nhập</h1>
      <form onSubmit={handleSubmit}>
        <label>Tài khoản</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />

        <label>Mật khẩu</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="field-error">{error}</p>}
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
}
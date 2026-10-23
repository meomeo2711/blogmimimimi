import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="brand">MiniBlog</Link>
      <div className="nav-links">
        <Link to="/">Trang chủ</Link>
        {user ? (
          <>
            <Link to="/write">Viết bài</Link>
            <span>Xin chào, {user.username}</span>
            <button onClick={handleLogout}>Đăng xuất</button>
          </>
        ) : (
          <Link to="/login">Đăng nhập</Link>
        )}
      </div>
    </nav>
  );
}
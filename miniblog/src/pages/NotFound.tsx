import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>404</h1>
      <p>Trang bạn tìm không tồn tại.</p>
      <Link to="/">Về trang chủ</Link>
    </div>
  );
}
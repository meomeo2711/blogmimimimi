import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPosts } from "../api";
import { getLocalPosts } from "../storage";
import type { Post } from "../types";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

export default function Home() {
  const [apiPosts, setApiPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [localPosts] = useState<Post[]>(() => getLocalPosts());

  useEffect(() => {
    let cancelled = false;

    fetchPosts()
      .then((data) => {
        if (!cancelled) setApiPosts(data);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message || "Có lỗi xảy ra");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const allPosts = [...localPosts, ...apiPosts];

  const keyword = search.trim().toLowerCase();
  const filtered = allPosts.filter((p) =>
    p.title.toLowerCase().includes(keyword)
  );

  return (
    <div>
      <h1>Danh sách bài viết</h1>

      <input
        type="text"
        placeholder="Tìm theo tiêu đề..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && filtered.length === 0 && (
        <p>Không tìm thấy bài viết nào.</p>
      )}

      <ul className="post-list">
        {filtered.map((post) => (
          <li key={post.id} className="post-item">
            <Link to={`/posts/${post.id}`}>
              <h3>
                {post.title} {post.isLocal && <span className="badge">Của tôi</span>}
              </h3>
            </Link>
            <p>{post.body.slice(0, 100)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
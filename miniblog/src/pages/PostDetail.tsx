import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchPost, fetchComments } from "../api";
import { getLocalPosts } from "../storage";
import type { Post, Comment } from "../types";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const postId = Number(id);

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");
      try {
        if (Number.isNaN(postId)) throw new Error("Mã bài viết không hợp lệ");

        // 1. Tìm trong bài local trước
        const local = getLocalPosts().find((p) => p.id === postId);
        if (local) {
          if (!cancelled) {
            setPost(local);
            setComments([]); // bài local không có bình luận
          }
          return;
        }

        // 2. Không có thì gọi API (chạy song song 2 request)
        const [postData, commentData] = await Promise.all([
          fetchPost(postId),
          fetchComments(postId),
        ]);
        if (!cancelled) {
          setPost(postData);
          setComments(commentData);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [postId]);

  return (
    <div>
      <Link to="/">← Quay lại</Link>

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}

      {post && !loading && (
        <article>
          <h1>{post.title}</h1>
          <p>{post.body}</p>

          <h2>Bình luận ({comments.length})</h2>
          {comments.length === 0 && <p>Chưa có bình luận.</p>}
          <ul className="comment-list">
            {comments.map((c) => (
              <li key={c.id} className="comment">
                <strong>{c.name}</strong>
                <em> ({c.email})</em>
                <p>{c.body}</p>
              </li>
            ))}
          </ul>
        </article>
      )}
    </div>
  );
}
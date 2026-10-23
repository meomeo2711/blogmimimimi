import type { Post, Comment } from "./types";

const BASE_URL = "https://jsonplaceholder.typicode.com";

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Không tải được dữ liệu (mã lỗi ${res.status})`);
  }
  return res.json() as Promise<T>;
}

export const fetchPosts = () => getJson<Post[]>(`${BASE_URL}/posts`);

export const fetchPost = (id: number) =>
  getJson<Post>(`${BASE_URL}/posts/${id}`);

export const fetchComments = (postId: number) =>
  getJson<Comment[]>(`${BASE_URL}/posts/${postId}/comments`);
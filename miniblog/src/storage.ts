import type { Post } from "./types";

const POSTS_KEY = "miniblog_posts";

export function getLocalPosts(): Post[] {
  try {
    const raw = localStorage.getItem(POSTS_KEY);
    return raw ? (JSON.parse(raw) as Post[]) : [];
  } catch {
    return [];
  }
}

export function addLocalPost(title: string, body: string): Post {
  const newPost: Post = {
    id: Date.now(), // id rất lớn, không bao giờ trùng với id 1-100 của API
    userId: 1,
    title,
    body,
    isLocal: true,
  };
  const posts = [newPost, ...getLocalPosts()]; // bài mới nằm đầu
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  return newPost;
}
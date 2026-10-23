export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
  isLocal?: boolean; // true nếu là bài do mình viết
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface User {
  username: string;
}
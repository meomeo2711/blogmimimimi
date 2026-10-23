import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { addLocalPost } from "../storage";

interface FormErrors {
  title?: string;
  body?: string;
}

export default function WritePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!title.trim()) errs.title = "Tiêu đề không được để trống";
    else if (title.trim().length < 5) errs.title = "Tiêu đề phải có ít nhất 5 ký tự";

    if (!body.trim()) errs.body = "Nội dung không được để trống";
    else if (body.trim().length < 20) errs.body = "Nội dung phải có ít nhất 20 ký tự";
    return errs;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return; // còn lỗi thì dừng

    addLocalPost(title.trim(), body.trim());
    navigate("/"); // về trang chủ, sẽ thấy bài mới ở đầu danh sách
  };

  return (
    <div className="form-box">
      <h1>Viết bài mới</h1>
      <form onSubmit={handleSubmit}>
        <label>Tiêu đề</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        {errors.title && <p className="field-error">{errors.title}</p>}

        <label>Nội dung</label>
        <textarea
          rows={8}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        {errors.body && <p className="field-error">{errors.body}</p>}

        <button type="submit">Đăng bài</button>
      </form>
    </div>
  );
}
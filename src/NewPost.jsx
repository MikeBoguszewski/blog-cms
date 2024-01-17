import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [redirect, setRedirect] = useState(false);
  async function createNewPost(event) {
    try {
      event.preventDefault();
      const token = sessionStorage.getItem("authToken");
      const response = await fetch("https://blog-api-i1ok.onrender.com/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });
      if (response.ok) {
        setRedirect(true);
      } else {
        const errorData = await response.json();
        console.error("Create Post Error:", errorData.message);
      }
    } catch (error) {
      console.error("Create Post Error:", error.message);
    }
  }

  if (redirect) return <Navigate to={"/posts"} />;
  return (
    <form onSubmit={createNewPost} className="post-form">
      <input type="text" placeholder="Title" value={title} onChange={(event) => setTitle(event.target.value)}></input>
      <ReactQuill theme="snow" value={content} onChange={setContent} />
      <button>Create Post</button>
    </form>
  );
}

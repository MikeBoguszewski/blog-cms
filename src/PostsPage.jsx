import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Post from "./Post";

export default function PostsPage() {
  const [posts, setPosts] = useState("");
  const isAuthenticated = sessionStorage.getItem("authToken");
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://blog-api-i1ok.onrender.com/api/posts");
        const postData = await response.json();
        setPosts(postData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchPosts();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="posts-container">
      <Link className="new-post" to={"/posts/new"}>New Post</Link>
      <div className="posts">{posts.length > 0 && posts.map((post) => <Post key={post._id} {...post} />)}</div>
    </div>
  );
}

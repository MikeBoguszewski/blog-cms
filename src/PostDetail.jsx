import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "./Comment";
import { format } from "date-fns";
import he from "he";

export default function PostDetail() {
  const [postInfo, setPostInfo] = useState(null);
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`https://blog-api-i1ok.onrender.com/api/posts/${id}`);
        const postData = await response.json();
        setPostInfo(postData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchComments = async () => {
      try {
        const response = await fetch(`https://blog-api-i1ok.onrender.com/api/comments/${id}`);
        const commentsData = await response.json();
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchPost();
    fetchComments();
  }, [id]);

  const togglePublished = async () => {
    const token = sessionStorage.getItem("authToken");
    const response = await fetch(`https://blog-api-i1ok.onrender.com/api/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: postInfo.title,
        content: postInfo.content,
        published: !postInfo.published,
      }),
    });
    if (response.ok) {
      setPostInfo((prevPostInfo) => ({
        ...prevPostInfo,
        published: !prevPostInfo.published,
      }));
    } else {
      const errorData = await response.json();
      console.error("Update publish status error:", errorData.message);
    }
  };
  const handleButtonClick = (event) => {
    event.preventDefault();
    togglePublished();
  };

  if (!postInfo) return "";
  const decodedContent = he.decode(postInfo.content);
  return (
    <div className="post-detail">
      <div className="info">
        <h1>{postInfo.title}</h1>
        <button className="publish-button" onClick={handleButtonClick}>
          {postInfo.published === true ? "Unpublish" : "Publish"}
        </button>
        <br />
        <time>{format(new Date(postInfo.updatedAt), "yyyy-MM-dd")}</time>
        <div className="content" dangerouslySetInnerHTML={{__html: decodedContent}}></div>
      </div>
      <div className="comments-container">
        <h2>{comments.length} Comments</h2>
        <div className="comments">{comments.length > 0 && comments.map((comment) => <Comment key={comment._id} {...comment} />)}</div>
      </div>
    </div>
  );
}



import { format } from "date-fns";

export default function Comment({ content, updatedAt, _id }) {
  const deleteComment = async () => {
    const response = await fetch(`https://blog-api-i1ok.onrender.com/api/comments/${_id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      window.location.reload();
    } else {
      const errorData = await response.json();
      console.error("Delete Error", errorData);
    }
  };
  return (
    <div className="comment">
      <time>{format(new Date(updatedAt), "yyyy-MM-dd hh:mm a")}</time>
      <p>{content}</p>
      <button onClick={deleteComment}>Delete</button>
    </div>
  );
}

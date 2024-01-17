import { Link, json } from "react-router-dom";
import { format } from "date-fns";
import he from "he";

export default function Post({ content, published, title, updatedAt, _id }) {
  const decodedContent = he.decode(content);
  return (
    <>
      <Link to={`/posts/${_id}`} className="post">
        <h2>{title}</h2>
        <p className="published">{published ? "Published" : "Unpublished"}</p>
        <br />
        <time>{format(new Date(updatedAt), "yyyy-MM-dd")}</time>
      </Link>
    </>
  );
}

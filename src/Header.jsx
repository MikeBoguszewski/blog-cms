import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <Link to={"/"} className="logo">
        Blog
      </Link>
    </header>
  );
}
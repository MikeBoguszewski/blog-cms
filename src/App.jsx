import { Route, Routes } from "react-router-dom";
import "./reset.css";
import "./App.css";
import Layout from "./Layout";
import LoginPage from "./LoginPage";
import PostsPage from "./PostsPage";
import NewPost from "./NewPost";
import PostDetail from "./PostDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LoginPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/posts/new" element={<NewPost/>} />
        <Route path="/posts/:id" element={<PostDetail/>} />
      </Route>
    </Routes>
  );
}

export default App;

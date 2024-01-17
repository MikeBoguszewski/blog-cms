import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [redirect, setRedirect] = useState(false);
  const login = async (event) => {
    event.preventDefault()
    if (!username || !password) {
      setErrorMessage("Please enter both username and password");
      return;
    }
    try {
       const response = await fetch("https://blog-api-i1ok.onrender.com/api/login", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({ username, password }),
       });

    if (response.ok) {
      const {token} = await response.json();
      sessionStorage.setItem("authToken", token)
      setRedirect(true);
    } else {
      const errorData = await response.json();
      console.error("Login Error:", errorData.message);
    }
    } catch(error) {
      console.error("Login Error:", error.message);
    }
  };
  if (redirect) {
    return <Navigate to={"/posts"}/>
  }
  return (
    <form onClick={login} className="login-form">
      <div className="login-container">
        <h1>Log in</h1>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" onChange={(event) => setUsername(event.target.value)}></input>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" onChange={(event) => setPassword(event.target.value)}></input>
        <button type="submit">Log in</button>
      </div>
    </form>
  );
}

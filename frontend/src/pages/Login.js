import React, { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(
        `http://127.0.0.1:5000/?username=${username}&password=${password}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.status);
      if (res.status === 200) {
        console.log(res.status);
        window.location.href = "/Home?username=" + username;
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="login">
      <h1>Login</h1>
      <div className="links">
        <a href="/login" class="active">
          Login
        </a>
        <a href="/register">Register</a>
      </div>
      <form onSubmit={handleSubmit}>
        <label for="username">
          <i className="fas fa-user"></i>
        </label>
        <input
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label for="password">
          <i className="fas fa-lock"></i>
        </label>
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <div className="msg">{message}</div>
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default Login;

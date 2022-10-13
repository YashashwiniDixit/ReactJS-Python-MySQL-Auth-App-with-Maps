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
      const resJson = await res.json();
      if (res.status === 200) {
        window.location.href = "/Home";
        setMessage(resJson.msg);
      } else {
        setMessage(resJson.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="login">
      <h1>Login</h1>
      <div className="links">
        <a href="/login" className="active">
          Login
        </a>
        <a href="/register">Register</a>
      </div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <label>
          <i className="fas fa-user"></i>
        </label>
        <input
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>
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

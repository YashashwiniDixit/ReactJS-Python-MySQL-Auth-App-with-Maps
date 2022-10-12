import React, { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(
        `http://127.0.0.1:5000/register?username=${username}&password=${password}&email=${email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      if (res.status === 200) {
        console.log(res.status);
        setMessage("Registered Successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="register">
      <h1>Register</h1>
      <div className="links">
        <a href="/login">Login</a>
        <a href="/register" className="active">
          Register
        </a>
      </div>
      <form onSubmit={handleSubmit} autocomplete="off">
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
        <label for="email">
          <i className="fas fa-envelope"></i>
        </label>
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="msg">{message}</div>
        <input type="submit" value="Register" />
      </form>
    </div>
  );
}

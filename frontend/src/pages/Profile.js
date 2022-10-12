import React from "react";
import Layout from "./Layout";
export default function Profile() {
  return (
    <>
      <Layout />
      <h2>Profile Page</h2>
      <div>
        <p>Your account details are below:</p>
        <table>
          <tr>
            <td>Username:</td>
            <td>username</td>
          </tr>
          <tr>
            <td>Password:</td>
            <td>password</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>email</td>
          </tr>
        </table>
      </div>
    </>
  );
}

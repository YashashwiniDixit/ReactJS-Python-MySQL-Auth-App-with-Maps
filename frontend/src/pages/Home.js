import React from "react";
import Layout from "./Layout";
import Map from "./MapOL";
export default function Home() {
  return (
    <>
      <Layout />
      <h2>Home Page</h2>
      <p>Welcome back,username!</p>
      <Map />
    </>
  );
}

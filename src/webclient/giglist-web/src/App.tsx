import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { NextUIProvider } from "@nextui-org/react";
import Home from "./pages/Home";
import Layout from "./Layout";

function App() {
  return (
    <NextUIProvider>
      <Layout>
        <Home />
      </Layout>
    </NextUIProvider>
  );
}

export default App;

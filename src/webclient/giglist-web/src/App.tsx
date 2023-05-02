import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { NextUIProvider } from "@nextui-org/react";
import Home from "./pages/Home";
import Layout from "./Layout";
import { Auth0Provider } from "@auth0/auth0-react";
import AuthenticationWrapper from "./Providers/Auth0Wrapper";

function App() {
  return (
    <NextUIProvider>
      <Auth0Provider
        domain="dev-zjdnezr9.us.auth0.com"
        clientId="f8S2PHnPB8EqMBkDKYlrIPOMXFjXqkR4" // todo: config this
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: "https://api.giglist.sjas.uk",
        }}
        cacheLocation="localstorage"
      >
        <AuthenticationWrapper>
          <Layout>
            <Home />
          </Layout>
        </AuthenticationWrapper>
      </Auth0Provider>
    </NextUIProvider>
  );
}

export default App;

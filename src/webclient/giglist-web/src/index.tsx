import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import { Auth0Provider } from "@auth0/auth0-react";
import AuthenticationWrapper from "./Providers/Auth0Wrapper";
import Home from "./pages/Home";
import EventPage from "./pages/EventPage";
import NewEventPage from "./pages/NewEventPage";
import { MantineProvider } from "@mantine/core";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/event/:eventId",
        element: <EventPage />,
      },
      {
        path: "/event/new",
        element: <NewEventPage />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "dark",
      }}
    >
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
          <RouterProvider router={router} />
        </AuthenticationWrapper>
      </Auth0Provider>
    </MantineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

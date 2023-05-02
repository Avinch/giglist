import { useAuth0 } from "@auth0/auth0-react";
import { Button, Navbar, User, Text } from "@nextui-org/react";
import LoginButton from "./components/auth/LoginButton";
import { useEffect } from "react";
import Profile from "./components/auth/Profile";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";

export default function Root() {
  const { isAuthenticated, user } = useAuth0();

  return (
    <>
      <Navbar>
        <Navbar.Brand>
          <Link to="/">
            <Text b color="black" hideIn="xs">
              Giglist
            </Text>
          </Link>
        </Navbar.Brand>
        <Navbar.Content>
          <Navbar.Item>
            {isAuthenticated ? <Profile /> : <LoginButton />}
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
      <Outlet />
    </>
  );
}

import { useAuth0 } from "@auth0/auth0-react";
import { Button, Navbar, User } from "@nextui-org/react";
import LoginButton from "./components/auth/LoginButton";
import { useEffect } from "react";
import Profile from "./components/auth/Profile";

type Props = {
  children: JSX.Element;
};

function Layout(props: Props) {
  const { isAuthenticated, user } = useAuth0();

  return (
    <>
      <Navbar>
        <Navbar.Brand>
          <h3>Giglist</h3>
        </Navbar.Brand>
        <Navbar.Content>
          <Navbar.Item>
            {isAuthenticated ? <Profile /> : <LoginButton />}
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
      <div>{props.children}</div>
    </>
  );
}

export default Layout;

import { Button, Navbar } from "@nextui-org/react";

type Props = {
  children: JSX.Element;
};

function Layout(props: Props) {
  return (
    <>
      <Navbar isBordered>
        <Navbar.Brand>
          <h3>Giglist</h3>
        </Navbar.Brand>
        <Navbar.Content>
          <Navbar.Item>
            <Button auto flat href="#">
              Login
            </Button>
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
      <div>{props.children}</div>
    </>
  );
}

export default Layout;

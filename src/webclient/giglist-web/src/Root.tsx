import { useAuth0 } from "@auth0/auth0-react";
import {
  AppShell,
  Aside,
  Burger,
  Footer,
  Header,
  MediaQuery,
  Navbar,
  Text,
  NavLink,
  useMantineTheme,
  Divider,
  Button,
} from "@mantine/core";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Profile from "./components/auth/Profile";

export default function Root() {
  const { isAuthenticated, user, loginWithRedirect } = useAuth0();
  const theme = useMantineTheme();
  const [navBarOpen, setNavBarOpen] = useState(false);
  const navigate = useNavigate();

  const openPage = (location: string) => {
    navigate(location);
    setNavBarOpen(false);
  };

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!navBarOpen}
          width={{ sm: 200, lg: 300 }}
        >
          <Navbar.Section grow>
            <NavLink
              label="Events"
              onClick={() => {
                openPage("/");
              }}
            />
          </Navbar.Section>
          <Navbar.Section>
            <Divider my="sm" />
            {isAuthenticated && user !== undefined ? (
              <Profile></Profile>
            ) : (
              <Button
                onClick={() => {
                  loginWithRedirect();
                }}
              >
                Log in
              </Button>
            )}
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={navBarOpen}
                onClick={() => setNavBarOpen((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Text>Giglist</Text>
          </div>
        </Header>
      }
    >
      <Outlet />
    </AppShell>
  );
}

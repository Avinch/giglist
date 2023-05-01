import { useAuth0 } from "@auth0/auth0-react";
import { Button, Dropdown, User } from "@nextui-org/react";

function Profile() {
  const { isAuthenticated, user, logout } = useAuth0();

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <User
          src={user?.picture}
          name={user?.name}
          description={user?.email}
        ></User>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>Logged in as: {user?.email}</Dropdown.Item>
        <Dropdown.Item key="logout" withDivider>
          <Button color="error" onClick={() => logout()}>
            Log Out
          </Button>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default Profile;

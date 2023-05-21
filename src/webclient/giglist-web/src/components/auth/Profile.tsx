import { useAuth0 } from "@auth0/auth0-react";
import { UnstyledButton, Group, Avatar, Text, Menu } from "@mantine/core";
import { IconChevronRight, IconExternalLink } from "@tabler/icons-react";
import { forwardRef } from "react";

interface UserButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  image: string;
  name: string;
  email: string;
  icon?: React.ReactNode;
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ image, name, email, icon, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.md,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
      {...others}
    >
      <Group>
        <Avatar src={image} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {name}
          </Text>

          <Text color="dimmed" size="xs">
            {email}
          </Text>
        </div>

        {icon || <IconChevronRight size="1rem" />}
      </Group>
    </UnstyledButton>
  )
);

export default function Profile() {
  const { user, logout } = useAuth0();

  return (
    <Group position="center">
      <Menu withArrow>
        <Menu.Target>
          <UserButton
            image={user?.picture ?? ""}
            name={user?.name ?? ""}
            email={user?.email ?? ""}
          ></UserButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            icon={<IconExternalLink />}
            color="red"
            onClick={() => {
              logout();
            }}
          >
            Log out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}

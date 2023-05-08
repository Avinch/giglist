import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { LoadingOverlay } from "@mantine/core";

type props = {
  children: JSX.Element;
};

function AuthenticationWrapper(props: props) {
  const { isLoading, error } = useAuth0();
  if (isLoading) {
    return <LoadingOverlay visible={true} overlayBlur={2} />;
  }
  if (error) {
    return <div>error! {error.message}</div>;
  }

  return <>{props.children}</>;
}

export default AuthenticationWrapper;

import React, { useContext } from "react";
import { Menu, Container, Button, Dropdown, Image } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";
import { RootStoreContext } from "../store";

const Navbar: React.FC = () => {
  const {
    userStore: { user, logout },
  } = useContext(RootStoreContext);

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header as={NavLink} to="/" exact>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "0.75rem" }}
          />
          TodoApp
        </Menu.Item>
        <Menu.Item name="Activities" as={NavLink} to="/activities" />
        <Menu.Item>
          <Button positive as={NavLink} to="/new-activity">
            New Activity
          </Button>
        </Menu.Item>
        {user && (
          <Menu.Item position="right">
            <Image
              avatar
              spaced="right"
              src={user.image || "/assets/user.png"}
            />
            <Dropdown pointing="top left" text={user.displayName}>
              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to={`/profile/username`}
                  text="My profile"
                  icon="user"
                />
                <Dropdown.Item onClick={logout} text="Logout" icon="power" />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
};

export default observer(Navbar);

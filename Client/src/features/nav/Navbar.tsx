import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
	return (
		<Menu inverted fixed="top">
			<Container>
				<Menu.Item header as={NavLink} to="/" exact>
					<img src="/assets/logo.png" alt="logo" style={{ marginRight: "0.75rem" }} />
					TodoApp
				</Menu.Item>
				<Menu.Item name="Activities" as={NavLink} to="/activities" />
				<Menu.Item>
					<Button positive as={NavLink} to="/new-activity">
						New Activity
					</Button>
				</Menu.Item>
			</Container>
		</Menu>
	);
};

export default observer(Navbar);

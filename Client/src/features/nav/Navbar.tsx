import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";

type Props = {
	onCreate: () => void;
};

const Navbar: React.FC<Props> = ({ onCreate }) => {
	return (
		<Menu inverted fixed="top">
			<Container>
				<Menu.Item header>
					<img src="/assets/logo.png" alt="logo" style={{ marginRight: "0.75rem" }} />
					Appita
				</Menu.Item>
				<Menu.Item name="Activities" />
				<Menu.Item>
					<Button onClick={onCreate} positive>
						New Activity
					</Button>
				</Menu.Item>
			</Container>
		</Menu>
	);
};

export default Navbar;

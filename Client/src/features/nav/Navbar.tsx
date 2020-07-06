import React, { useContext } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import ActivityStore from "../../app/store/activityStore";
import { observer } from "mobx-react-lite";

const Navbar: React.FC = () => {
	const activityStore = useContext(ActivityStore);

	return (
		<Menu inverted fixed="top">
			<Container>
				<Menu.Item header>
					<img src="/assets/logo.png" alt="logo" style={{ marginRight: "0.75rem" }} />
					TodoApp
				</Menu.Item>
				<Menu.Item name="Activities" />
				<Menu.Item>
					<Button onClick={activityStore.openCreateForm} positive>
						New Activity
					</Button>
				</Menu.Item>
			</Container>
		</Menu>
	);
};

export default observer(Navbar);

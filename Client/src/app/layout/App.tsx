import React from "react";
import { observer } from "mobx-react-lite";
import { Container } from "semantic-ui-react";
import Navbar from "../../features/nav/Navbar";
import ActivityDashboard from "../../features/activities/ActivityDashboard";

const App: React.FC = () => (
	<>
		<Navbar />
		<Container style={{ marginTop: "7rem" }}>
			<ActivityDashboard></ActivityDashboard>
		</Container>
	</>
);

export default observer(App);

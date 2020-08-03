import React, { FC } from "react";
import { BrowserRouter as Router, Route, withRouter, RouteComponentProps } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Container } from "semantic-ui-react";
import Navbar from "../../features/nav/Navbar";
import ActivityDashboard from "../../features/activities/ActivityDashboard";
import Home from "../../modules/Home";
import ActivityForm from "../../features/activities/ActivityForm";
import ActivityDetails from "../../features/activities/ActivityDetails";
import ScrollToTop from "./ScrollToTop";

const Layout = withRouter(({ location }: RouteComponentProps) => (
	<>
		<Route exact path="/" component={Home} />
		<Route
			path={"/(.+)"}
			render={() => (
				<>
					<Navbar />
					<Container style={{ marginTop: "7rem" }}>
						<Route exact path="/activities" component={ActivityDashboard} />
						<Route path="/details/:id" component={ActivityDetails} />
						<Route
							key={location.key}
							path={["/new-activity", "/edit-activity/:id"]}
							component={ActivityForm}
						/>
					</Container>
				</>
			)}
		/>
	</>
));

const App: FC = () => (
	<Router>
		<ScrollToTop />
		<Layout />
	</Router>
);

export default observer(App);

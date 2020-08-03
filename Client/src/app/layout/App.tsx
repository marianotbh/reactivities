import React, { FC } from "react";
import { BrowserRouter as Router, Route, withRouter, RouteComponentProps } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Container } from "semantic-ui-react";
import Navbar from "./Navbar";
import Home from "../../features/Home";
import ActivityDashboard from "../../features/Dashboard";
import ActivityForm from "../../features/Dashboard/ActivityForm";
import ActivityDetails from "../../features/Details";
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

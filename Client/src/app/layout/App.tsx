import React, { FC } from "react";
import {
  Router,
  Route,
  withRouter,
  RouteComponentProps,
  Switch,
} from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Container } from "semantic-ui-react";
import Navbar from "./Navbar";
import Home from "../../features/Home";
import ActivitiesDashboard from "../../features/ActivitiesDashboard";
import ActivityForm from "../../features/ActivitiesDashboard/ActivityForm";
import ActivityDetails from "../../features/ActivityDetails";
import ScrollToTop from "./ScrollToTop";
import NotFound from "./NotFound";
import { history } from "./history";
import { ToastContainer } from "react-toastify";
import dateFnsLocalizer from "react-widgets-date-fns";

dateFnsLocalizer();

const Layout = withRouter(({ location }: RouteComponentProps) => (
  <>
    <Route exact path="/" component={Home} />
    <Route
      path={"/(.+)"}
      render={() => (
        <>
          <Navbar />
          <Container style={{ marginTop: "7rem" }}>
            <Switch>
              <Route exact path="/activities" component={ActivitiesDashboard} />
              <Route path="/details/:id" component={ActivityDetails} />
              <Route
                key={location.key}
                path={["/new-activity", "/edit-activity/:id"]}
                component={ActivityForm}
              />
              <Route component={NotFound} />
            </Switch>
          </Container>
        </>
      )}
    />
  </>
));

const App: FC = () => (
  <Router history={history}>
    <ToastContainer position="bottom-right" />
    <ScrollToTop />
    <Layout />
  </Router>
);

export default observer(App);

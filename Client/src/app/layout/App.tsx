import React, { FC, useContext, useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Container } from 'semantic-ui-react';
import Navbar from './Navbar';
import Home from '../../features/Home';
import ActivitiesDashboard from '../../features/ActivitiesDashboard';
import ActivityForm from '../../features/ActivitiesDashboard/ActivityForm';
import ActivityDetails from '../../features/ActivityDetails';
import ScrollToTop from './ScrollToTop';
import NotFound from './NotFound';
import { history } from './history';
import { ToastContainer } from 'react-toastify';
import dateFnsLocalizer from 'react-widgets-date-fns';
import LoginForm from '../../features/Users/LoginForm';
import { RootStoreContext } from '../store';
import Loader from './Loader';
import ModalContainer from '../common/modals/ModalContainer';

dateFnsLocalizer();

const App: FC = () => {
	const {
		commonStore: { appLoaded, setAppLoaded, token },
		userStore: { getUser }
	} = useContext(RootStoreContext);

	useEffect(() => {
		if (token) {
			getUser().finally(() => setAppLoaded());
		} else {
			setAppLoaded();
		}
	}, [getUser, setAppLoaded, token]);

	if (!appLoaded) return <Loader content={'Loading...'} />;

	return (
		<>
			<ModalContainer />
			<Router history={history}>
				<ToastContainer position="bottom-right" />
				<ScrollToTop />
				<Route exact path="/" component={Home} />
				<Route
					path={'/(.+)'}
					render={() => (
						<>
							<Navbar />
							<Container style={{ marginTop: '7rem' }}>
								<Switch>
									<Route
										exact
										path="/activities"
										component={ActivitiesDashboard}
									/>
									<Route
										path="/details/:id"
										component={ActivityDetails}
									/>
									<Route
										key={history.location.key}
										path={[
											'/new-activity',
											'/edit-activity/:id'
										]}
										component={ActivityForm}
									/>
									<Route
										path="/login"
										component={LoginForm}
									/>
									<Route component={NotFound} />
								</Switch>
							</Container>
						</>
					)}
				/>
			</Router>
		</>
	);
};
export default observer(App);

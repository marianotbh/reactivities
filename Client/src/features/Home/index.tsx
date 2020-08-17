import React, { FC, useContext } from 'react';
import { Container, Segment, Header, Button, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../app/store';
import LoginForm from '../Users/LoginForm';
import RegisterForm from '../Users/RegisterForm';

const Home: FC = () => {
	const {
		userStore: { isLoggedIn, user },
		modalStore: { open }
	} = useContext(RootStoreContext);

	return (
		<Segment inverted textAlign="center" vertical className="masthead">
			<Container text>
				<Header as="h1" inverted>
					<Image
						size="massive"
						src="/assets/logo.png"
						alt="logo"
						style={{ marginBottom: 12 }}
					/>
					Reactivities
				</Header>
				{isLoggedIn && user ? (
					<>
						<Header
							as="h2"
							inverted
							content={`Welcome back, ${user.displayName}`}
						/>
						<Button as={Link} to="/activities" size="huge" inverted>
							Go to Activities
						</Button>
					</>
				) : (
					<>
						<Header
							as="h2"
							inverted
							content="Welcome to Reactivities"
						/>
						<Button onClick={() => open(<LoginForm />)} size="huge">
							Login
						</Button>
						<Button
							onClick={() => open(<RegisterForm />)}
							size="huge"
							inverted
						>
							Register
						</Button>
					</>
				)}
			</Container>
		</Segment>
	);
};

export default Home;

import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { Header, Icon, List } from "semantic-ui-react";

type Value = {
	id: number;
	name: string;
};

class App extends Component {
	state = {
		values: new Array<Value>()
	};

	componentDidMount() {
		axios.get<Array<Value>>("http://localhost:5000/api/values").then(({ data: values }) => {
			this.setState({ values });
		});
	}

	render() {
		const { values } = this.state;

		return (
			<div>
				<Header as="h2">
					<Icon name="users" />
					<Header.Content>Users</Header.Content>
				</Header>
				<List>
					{values.map(({ id, name }) => (
						<List.Item key={id}>{name}</List.Item>
					))}
				</List>
			</div>
		);
	}
}

export default App;

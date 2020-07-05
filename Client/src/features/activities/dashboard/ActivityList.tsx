import React, { FC, SyntheticEvent, useState, useEffect } from "react";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";

type Props = {
	activities: IActivity[];
	onSelectActivity: (id: string) => void;
	deleteActivity: (id: string) => void;
	submitting: boolean;
};

const ActivityList: FC<Props> = ({ activities, onSelectActivity, deleteActivity, submitting }) => {
	const [target, setTarget] = useState("");

	useEffect(() => {
		if (target && !submitting) {
			console.log("oof");
			setTarget("");
		}
	}, [submitting]);

	const handleDelete = (id: string) => (ev: SyntheticEvent<HTMLButtonElement>) => {
		setTarget(ev.currentTarget.name);
		deleteActivity(id);
	};

	return (
		<Segment clearing>
			<Item.Group divided>
				{activities.map(({ id, title, description, category, city, date, venue }) => (
					<Item key={id}>
						<Item.Content>
							<Item.Header as="a">{title}</Item.Header>
							<Item.Meta>{date}</Item.Meta>
							<Item.Description>
								<div>{description}</div>
								<div>
									{city}, {venue}
								</div>
							</Item.Description>
							<Item.Extra>
								<Button
									onClick={() => onSelectActivity(id)}
									floated="right"
									content="View"
									color="blue"
								/>
								<Button
									name={id}
									loading={submitting && target === id}
									onClick={handleDelete(id)}
									floated="right"
									content="Delete"
									color="red"
								/>
								<Label basic content={category} />
							</Item.Extra>
						</Item.Content>
					</Item>
				))}
			</Item.Group>
		</Segment>
	);
};

export default ActivityList;

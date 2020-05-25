import React, { FC } from "react";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";

type Props = {
	activities: IActivity[];
	onSelectActivity: (id: string) => void;
	deleteActivity: (id: string) => void;
};

const ActivityList: FC<Props> = ({ activities, onSelectActivity, deleteActivity }) => {
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
									onClick={() => deleteActivity(id)}
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

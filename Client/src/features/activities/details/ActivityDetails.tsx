import React, { FC } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";

type Props = {
	activity: IActivity;
	setEditMode: (editMode: boolean) => void;
	setSelectedActivity: (activity: IActivity | null) => void;
};

const ActivityDetails: FC<Props> = ({ activity, setEditMode, setSelectedActivity }) => {
	const { title, description, date, category } = activity;

	return (
		<Card fluid>
			<Image src={`/assets/categories/${category}.jpg`} wrapped ui={false} />
			<Card.Content>
				<Card.Header>{title}</Card.Header>
				<Card.Meta>
					<span>{date}</span>
				</Card.Meta>
				<Card.Description>{description}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<Button.Group widths={2}>
					<Button onClick={() => setEditMode(true)} basic color="blue" content="Edit" />
					<Button onClick={() => setSelectedActivity(null)} basic color="grey" content="Cancel" />
				</Button.Group>
			</Card.Content>
		</Card>
	);
};

export default ActivityDetails;

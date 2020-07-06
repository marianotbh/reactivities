import React, { FC, useContext } from "react";
import ActivityStore from "../../app/store/activityStore";
import { observer } from "mobx-react-lite";
import { Card, Image, Button } from "semantic-ui-react";

const ActivityDetails: FC = () => {
	const activityStore = useContext(ActivityStore);

	const { selectedActivity: activity, openEditForm, deselectActivity } = activityStore;

	const { id, title, description, date, category } = activity!;

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
					<Button onClick={() => openEditForm(id)} basic color="blue" content="Edit" />
					<Button onClick={() => deselectActivity()} basic color="grey" content="Close" />
				</Button.Group>
			</Card.Content>
		</Card>
	);
};

export default observer(ActivityDetails);

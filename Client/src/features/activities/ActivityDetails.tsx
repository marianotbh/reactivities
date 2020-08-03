import React, { FC, useContext, useEffect } from "react";
import ActivityStore from "../../app/store/activityStore";
import { observer } from "mobx-react-lite";
import { Card, Image, Button } from "semantic-ui-react";
import { RouteComponentProps } from "react-router-dom";
import Loader from "../../app/layout/Loader";

type Params = {
	id: string;
};

const ActivityDetails: FC<RouteComponentProps<Params>> = ({ match, history }) => {
	const activityStore = useContext(ActivityStore);

	const { selectedActivity, loadActivity, loading } = activityStore;

	useEffect(() => {
		loadActivity(match.params.id);
	}, [loadActivity, match.params.id]);

	if (loading || !selectedActivity) return <Loader content={"Loading activity..."} />;

	const { id, title, description, date, category } = selectedActivity;
	debugger;
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
					<Button
						onClick={() => {
							debugger;
							history.push(`/edit-activity/${id}`);
						}}
						basic
						color="blue"
						content="Edit"
					/>
					<Button
						onClick={() => {
							history.push("/activities");
						}}
						basic
						color="grey"
						content="Close"
					/>
				</Button.Group>
			</Card.Content>
		</Card>
	);
};

export default observer(ActivityDetails);

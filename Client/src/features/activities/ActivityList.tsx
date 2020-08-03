import React, { FC, SyntheticEvent, useState, useEffect, useContext } from "react";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../app/store/activityStore";
import Loader from "../../app/layout/Loader";
import { Link } from "react-router-dom";

const ActivityList: FC = () => {
	const activityStore = useContext(ActivityStore);
	const { activitiesByDate, deleteActivity, submitting } = activityStore;
	const [target, setTarget] = useState("");

	useEffect(() => {
		activityStore.loadActivities();
	}, [activityStore]);

	useEffect(() => {
		if (target && !submitting) {
			setTarget("");
		}
	}, [target, submitting]);

	const handleDelete = (id: string) => (ev: SyntheticEvent<HTMLButtonElement>) => {
		setTarget(ev.currentTarget.name);
		deleteActivity(id);
	};

	if (activityStore.loading) return <Loader content={"Loading Activities..."} />;

	return (
		<Segment clearing>
			<Item.Group divided>
				{activitiesByDate.map(({ id, title, description, category, city, date, venue }) => (
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
									as={Link}
									to={`/details/${id}`}
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

export default observer(ActivityList);

import React, { FC, useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../app/models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../app/store/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";

type Params = {
	id: string;
};

const ActivityForm: FC<RouteComponentProps<Params>> = ({ match, history }) => {
	const activityStore = useContext(ActivityStore);
	const {
		createActivity,
		editActivity,
		selectedActivity,
		submitting,
		loadActivity,
		clearActivity
	} = activityStore;

	const [activity, setActivity] = useState<IActivity>({
		id: "",
		title: "",
		category: "",
		description: "",
		date: "",
		city: "",
		venue: ""
	});

	useEffect(() => {
		if (match.params.id && activity.id.length === 0) {
			loadActivity(match.params.id).then(() => {
				selectedActivity && setActivity(selectedActivity);
			});
		}

		return () => clearActivity();
	}, [loadActivity, clearActivity, match.params.id, activity.id.length, selectedActivity]);

	const handleInputChange = (ev: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = ev.currentTarget;
		setActivity({ ...activity, [name]: value });
	};

	const handleSubmit = async () => {
		if (activity.id.length === 0) {
			const newActivity = {
				...activity,
				id: uuid()
			};
			await createActivity(newActivity);
			history.push(`/details/${newActivity.id}`);
		} else {
			await editActivity(activity);
			history.push(`/activities`);
		}
	};

	return (
		<Segment clearing>
			<Form onSubmit={handleSubmit}>
				<Form.Input
					name="title"
					onChange={handleInputChange}
					placeholder="Title"
					value={activity.title}
				/>
				<Form.TextArea
					name="description"
					onChange={handleInputChange}
					rows={2}
					placeholder="Description"
					value={activity.description}
				/>
				<Form.Input
					name="category"
					onChange={handleInputChange}
					placeholder="Category"
					value={activity.category}
				/>
				<Form.Input
					name="date"
					onChange={handleInputChange}
					type="datetime-local"
					placeholder="Date"
					value={activity.date}
				/>
				<Form.Input
					name="city"
					onChange={handleInputChange}
					placeholder="City"
					value={activity.city}
				/>
				<Form.Input
					name="venue"
					onChange={handleInputChange}
					placeholder="Venue"
					value={activity.venue}
				/>
				<Button loading={submitting} floated="right" positive type="submit" content="Submit" />
				<Button
					onClick={() => history.push(`/activities`)}
					floated="right"
					type="button"
					content="Cancel"
				/>
			</Form>
		</Segment>
	);
};

export default observer(ActivityForm);

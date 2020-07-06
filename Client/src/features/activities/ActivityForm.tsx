import React, { FC, useState, FormEvent, useContext } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../app/models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../app/store/activityStore";
import { observer } from "mobx-react-lite";

type Props = {
	activity: IActivity | null;
};

const ActivityForm: FC<Props> = ({ activity: initialActivitiyState }) => {
	const activityStore = useContext(ActivityStore);

	const { createActivity, editActivity, submitting, toggleEditMode } = activityStore;

	const [activity, setActivity] = useState<IActivity>(
		initialActivitiyState ?? {
			id: "",
			title: "",
			category: "",
			description: "",
			date: "",
			city: "",
			venue: ""
		}
	);

	const handleInputChange = (ev: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = ev.currentTarget;
		setActivity({ ...activity, [name]: value });
	};

	const handleSubmit = () => {
		if (activity.id.length === 0) {
			createActivity({
				...activity,
				id: uuid()
			});
		} else {
			editActivity(activity);
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
					onClick={() => toggleEditMode(false)}
					floated="right"
					type="button"
					content="Cancel"
				/>
			</Form>
		</Segment>
	);
};

export default observer(ActivityForm);

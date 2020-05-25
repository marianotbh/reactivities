import React, { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";
import axios from "axios";
import { IActivity } from "../models/activity";
import Navbar from "../../features/nav/Navbar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

const App: React.FC = () => {
	const [activities, setActivities] = useState<IActivity[]>([]);
	const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
	const [editMode, setEditMode] = useState(false);

	const handleSelectActivity = (id: string) => {
		setSelectedActivity(activities.find(a => a.id === id) ?? null);
	};

	const handleOpenCreateForm = () => {
		setSelectedActivity(null);
		setEditMode(true);
	};

	const handleCreateActivity = (activity: IActivity) => {
		setActivities([...activities, activity]);
		setSelectedActivity(activity);
		setEditMode(false);
	};

	const handleEditActivity = (activity: IActivity) => {
		setActivities([...activities.filter(a => a.id !== activity.id), activity]);
		setSelectedActivity(activity);
		setEditMode(false);
	};

	const handleDeleteActivity = (id: string) => {
		setActivities([...activities.filter(a => a.id !== id)]);
	};

	useEffect(() => {
		axios.get<IActivity[]>("http://localhost:5000/api/activities").then(({ data: activities }) => {
			setActivities(
				activities.map(activity => ({
					...activity,
					date: activity.date.split(".")[0]
				}))
			);
		});
	}, []);

	return (
		<>
			<Navbar onCreate={handleOpenCreateForm} />
			<Container style={{ marginTop: "7rem" }}>
				<ActivityDashboard
					activities={activities}
					onSelectActivity={handleSelectActivity}
					selectedActivity={selectedActivity}
					editMode={editMode}
					setEditMode={setEditMode}
					setSelectedActivity={setSelectedActivity}
					createActivity={handleCreateActivity}
					editActivity={handleEditActivity}
					deleteActivity={handleDeleteActivity}
				></ActivityDashboard>
			</Container>
		</>
	);
};

export default App;

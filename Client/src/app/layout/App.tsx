import React, { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import Navbar from "../../features/nav/Navbar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { getActivities, createActivity, editActivity, deleteActivity } from "../api/activities";
import Loader from "./Loader";

const App: React.FC = () => {
	const [activities, setActivities] = useState<IActivity[]>([]);
	const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
	const [editMode, setEditMode] = useState(false);
	const [loading, setLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false);

	const handleSelectActivity = (id: string) => {
		setSelectedActivity(activities.find(a => a.id === id) ?? null);
	};

	const handleOpenCreateForm = () => {
		setSelectedActivity(null);
		setEditMode(true);
	};

	const handleCreateActivity = async (activity: IActivity) => {
		setSubmitting(true);
		try {
			await createActivity(activity);
			setActivities([...activities, activity]);
			setSelectedActivity(activity);
			setEditMode(false);
		} catch (error) {
		} finally {
			setSubmitting(false);
		}
	};

	const handleEditActivity = async (activity: IActivity) => {
		setSubmitting(true);
		try {
			await editActivity(activity);
			setActivities([...activities.filter(a => a.id !== activity.id), activity]);
			setSelectedActivity(activity);
			setEditMode(false);
		} catch (error) {
		} finally {
			setSubmitting(false);
		}
	};

	const handleDeleteActivity = async (id: string) => {
		setSubmitting(true);
		try {
			await deleteActivity(id);
			setActivities([...activities.filter(a => a.id !== id)]);
		} catch (error) {
		} finally {
			setSubmitting(false);
		}
	};

	useEffect(() => {
		(async () => {
			const activities = await getActivities();
			setActivities(
				activities.map(activity => ({
					...activity,
					date: activity.date.split(".")[0]
				}))
			);
			setLoading(false);
		})();
	}, []);

	if (loading) return <Loader content={"Loading Activities..."} />;

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
					submitting={submitting}
				></ActivityDashboard>
			</Container>
		</>
	);
};

export default App;

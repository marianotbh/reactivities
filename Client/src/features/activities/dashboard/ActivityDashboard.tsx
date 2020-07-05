import React, { FC } from "react";
import { Grid } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

type Props = {
	activities: IActivity[];
	onSelectActivity: (id: string) => void;
	selectedActivity: IActivity | null;
	setSelectedActivity: (activity: IActivity | null) => void;
	editMode: boolean;
	setEditMode: (editMode: boolean) => void;
	createActivity: (activity: IActivity) => void;
	editActivity: (activity: IActivity) => void;
	deleteActivity: (id: string) => void;
	submitting: boolean;
};

const ActivityDashboard: FC<Props> = ({
	activities,
	onSelectActivity,
	selectedActivity,
	setSelectedActivity,
	createActivity,
	editActivity,
	deleteActivity,
	editMode,
	setEditMode,
	submitting
}) => {
	return (
		<Grid>
			<Grid.Column width={10}>
				<ActivityList
					activities={activities}
					onSelectActivity={onSelectActivity}
					deleteActivity={deleteActivity}
					submitting={submitting}
				/>
			</Grid.Column>
			<Grid.Column width={6}>
				{selectedActivity && !editMode && (
					<ActivityDetails
						activity={selectedActivity}
						setSelectedActivity={setSelectedActivity}
						setEditMode={setEditMode}
					/>
				)}
				{editMode && (
					<ActivityForm
						key={selectedActivity?.id ?? 0}
						createActivity={createActivity}
						editActivity={editActivity}
						activity={selectedActivity}
						setEditMode={setEditMode}
						submitting={submitting}
					/>
				)}
			</Grid.Column>
		</Grid>
	);
};

export default ActivityDashboard;

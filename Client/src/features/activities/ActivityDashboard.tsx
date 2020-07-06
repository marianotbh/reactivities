import React, { FC, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import ActivityDetails from "./ActivityDetails";
import ActivityForm from "./ActivityForm";
import ActivityStore from "../../app/store/activityStore";

const ActivityDashboard: FC = () => {
	const activityStore = useContext(ActivityStore);

	const { editMode, selectedActivity } = activityStore;

	return (
		<Grid>
			<Grid.Column width={10}>
				<ActivityList />
			</Grid.Column>
			<Grid.Column width={6}>
				{selectedActivity && !editMode && <ActivityDetails />}
				{editMode && <ActivityForm key={selectedActivity?.id ?? 0} activity={selectedActivity} />}
			</Grid.Column>
		</Grid>
	);
};

export default observer(ActivityDashboard);

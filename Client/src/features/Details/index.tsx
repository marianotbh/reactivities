import React, { FC, useContext, useEffect } from "react";
import { ActivityStore } from "../../app/store/activityStore";
import { observer } from "mobx-react-lite";
import { Grid } from "semantic-ui-react";
import { RouteComponentProps } from "react-router-dom";
import Loader from "../../app/layout/Loader";
import DetailHeader from "./DetailHeader";
import DetailInfo from "./DetailInfo";
import DetailChat from "./DetailChat";
import DetailSidebar from "./DetailSidebar";

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

	return (
		<Grid>
			<Grid.Column width={10}>
				<DetailHeader {...selectedActivity} />
				<DetailInfo {...selectedActivity} />
				<DetailChat />
			</Grid.Column>
			<Grid.Column width={6}>
				<DetailSidebar />
			</Grid.Column>
		</Grid>
	);
};

export default observer(ActivityDetails);

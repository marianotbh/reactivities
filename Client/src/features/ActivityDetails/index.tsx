import React, { FC, useContext, useEffect } from "react";
import { ActivityStore } from "../../app/store/activityStore";
import { observer } from "mobx-react-lite";
import { Grid } from "semantic-ui-react";
import { RouteComponentProps } from "react-router-dom";
import Loader from "../../app/layout/Loader";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsChat from "./ActivityDetailsChat";
import ActivityDetailsSidebar from "./ActivityDetailsSidebar";

type Params = {
  id: string;
};

const ActivityDetails: FC<RouteComponentProps<Params>> = ({
  match,
  history,
}) => {
  const activityStore = useContext(ActivityStore);

  const { selectedActivity, loadActivity, loading } = activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity, match.params.id, history]);

  if (loading || !selectedActivity)
    return <Loader content={"Loading activity..."} />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailsHeader {...selectedActivity} />
        <ActivityDetailsInfo {...selectedActivity} />
        <ActivityDetailsChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailsSidebar />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDetails);

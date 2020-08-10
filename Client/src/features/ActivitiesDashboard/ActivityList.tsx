import React, { FC, useState, useEffect, useContext, Fragment } from "react";
import { Item, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { ActivityStore } from "../../app/store/activityStore";
import Loader from "../../app/layout/Loader";
import ActivityItem from "./ActivityItem";

const ActivityList: FC = () => {
  const activityStore = useContext(ActivityStore);
  const { activitiesByDate, submitting } = activityStore;
  const [target, setTarget] = useState("");

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  useEffect(() => {
    if (target && !submitting) {
      setTarget("");
    }
  }, [target, submitting]);

  return activityStore.loading ? (
    <Loader content={"Loading Activities..."} />
  ) : (
    <>
      {activitiesByDate.map(([date, activities]) => (
        <Fragment key={date}>
          <Label key={date} size="large" color="blue">
            {date}
          </Label>
          <Item.Group divided>
            {activities.map((activity) => (
              <ActivityItem key={activity.id} {...activity} />
            ))}
          </Item.Group>
        </Fragment>
      ))}
    </>
  );
};

export default observer(ActivityList);

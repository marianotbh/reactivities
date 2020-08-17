import React, { FC, useState, useEffect, useContext, Fragment } from 'react';
import { Item, Label } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../app/store';
import Loader from '../../app/layout/Loader';
import ActivityItem from './ActivityItem';
import { format } from 'date-fns';

const ActivityList: FC = () => {
	const {
		activityStore: { loadActivities, activitiesByDate, loading, submitting }
	} = useContext(RootStoreContext);
	const [target, setTarget] = useState('');

	useEffect(() => {
		loadActivities();
	}, [loadActivities]);

	useEffect(() => {
		if (target && !submitting) {
			setTarget('');
		}
	}, [target, submitting]);

	return loading ? (
		<Loader content={'Loading Activities...'} />
	) : (
		<>
			{activitiesByDate.map(([date, activities]) => (
				<Fragment key={date}>
					<Label key={date} size="large" color="blue">
						{format(new Date(date), 'eeee do MMMM')}
					</Label>
					<Item.Group divided>
						{activities.map(activity => (
							<ActivityItem key={activity.id} {...activity} />
						))}
					</Item.Group>
				</Fragment>
			))}
		</>
	);
};

export default observer(ActivityList);

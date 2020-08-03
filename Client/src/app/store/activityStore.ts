import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext } from "react";
import { IActivity } from "../models/activity";
import {
	getActivities,
	createActivity,
	editActivity,
	deleteActivity,
	getActivity
} from "../api/activities";

configure({ enforceActions: "always" });

class ActivityStore {
	@observable activityRegistry = new Map<string, IActivity>();
	@observable selectedActivity: IActivity | null = null;
	@observable loading = false;
	@observable submitting = false;

	@computed get activitiesByDate() {
		return Array.from(this.activityRegistry.values()).sort(
			(a, b) => Date.parse(a.date) - Date.parse(b.date)
		);
	}

	@action loadActivities = async () => {
		this.loading = true;

		try {
			const activities = await getActivities();

			runInAction("loading activity", () => {
				activities.forEach(activity => {
					this.activityRegistry.set(activity.id, {
						...activity,
						date: activity.date.split(".")[0]
					});
				});
			});
		} catch (error) {
			alert(error);
		}

		runInAction(() => (this.loading = false));
	};

	@action loadActivity = async (id: string) => {
		if (this.activityRegistry.has(id)) {
			this.selectedActivity = this.activityRegistry.get(id)!;
		} else {
			this.loading = true;

			try {
				const activity = await getActivity(id);
				runInAction("getting activity", () => {
					this.selectedActivity = activity;
				});
			} catch (error) {
				console.log(error);
			}

			runInAction(() => (this.loading = false));
		}
	};

	@action clearActivity = () => {
		this.selectedActivity = null;
	};

	@action createActivity = async (activity: IActivity) => {
		this.submitting = true;

		try {
			await createActivity(activity);

			runInAction("creating activity", () => {
				this.activityRegistry.set(activity.id, activity);
			});
		} catch (error) {
			alert(error);
		}

		runInAction(() => (this.submitting = false));
	};

	@action editActivity = async (activity: IActivity) => {
		this.submitting = true;

		try {
			await editActivity(activity);

			runInAction("editing activity", () => {
				this.activityRegistry.set(activity.id, activity);
				this.selectedActivity = activity;
			});
		} catch (error) {
			alert(error);
		}

		runInAction(() => (this.submitting = false));
	};

	@action deleteActivity = async (id: string) => {
		this.submitting = true;

		try {
			await deleteActivity(id);
			runInAction("deleting activity", () => this.activityRegistry.delete(id));
		} catch (error) {
			alert(error);
		}

		runInAction(() => (this.submitting = false));
	};
}

export default createContext(new ActivityStore());

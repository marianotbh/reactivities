import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext } from "react";
import { Activity } from "../models/Activity";
import {
	getActivities,
	createActivity,
	editActivity,
	deleteActivity,
	getActivity
} from "../api/activities";

configure({ enforceActions: "always" });

class ActivityStore {
	@observable activities = new Map<string, Activity>();
	@observable selectedActivity: Activity | null = null;
	@observable loading = false;
	@observable submitting = false;

	@computed get activitiesByDate() {
		return Array.from(this.activities.values())
			.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
			.reduce((groups, activity) => {
				const date = activity.date.split("T")[0];

				if (groups.has(date)) {
					groups.get(date)!.add(activity);
				} else {
					groups.set(date, new Set([activity]));
				}

				return groups;
			}, new Map<string, Set<Activity>>());
	}

	@action loadActivities = async () => {
		this.loading = true;

		try {
			const activities = await getActivities();

			runInAction("loading activity", () => {
				activities.forEach(activity => {
					this.activities.set(activity.id, {
						...activity,
						date: activity.date.split(".")[0]
					});
				});
			});
		} catch (error) {
			console.error(error);
		}

		runInAction(() => (this.loading = false));
	};

	@action loadActivity = async (id: string) => {
		if (this.activities.has(id)) {
			this.selectedActivity = this.activities.get(id)!;
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

	@action createActivity = async (activity: Activity) => {
		this.submitting = true;

		try {
			await createActivity(activity);

			runInAction("creating activity", () => {
				this.activities.set(activity.id, activity);
			});
		} catch (error) {
			alert(error);
		}

		runInAction(() => (this.submitting = false));
	};

	@action editActivity = async (activity: Activity) => {
		this.submitting = true;

		try {
			await editActivity(activity);

			runInAction("editing activity", () => {
				this.activities.set(activity.id, activity);
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
			runInAction("deleting activity", () => this.activities.delete(id));
		} catch (error) {
			alert(error);
		}

		runInAction(() => (this.submitting = false));
	};
}

const store = createContext(new ActivityStore());

export { store as ActivityStore };

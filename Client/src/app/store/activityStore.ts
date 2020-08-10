import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext } from "react";
import { Activity } from "../models/Activity";
import {
  getActivities,
  createActivity,
  editActivity,
  deleteActivity,
  getActivity,
} from "../api/activities";

configure({ enforceActions: "always" });

class ActivityStore {
  @observable activities = new Map<string, Activity>();
  @observable selectedActivity: Activity | null = null;
  @observable loading = false;
  @observable submitting = false;

  @computed get activitiesByDate() {
    return Array.from(
      Array.from(this.activities.values())
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .reduce((groups, activity) => {
          const date = activity.date.toISOString().split("T")[0]!;

          if (groups.has(date)) {
            groups.get(date)!.push(activity);
          } else {
            groups.set(date, [activity]);
          }

          return groups;
        }, new Map<string, Array<Activity>>())
        .entries()
    );
  }

  @action loadActivities = async () => {
    this.loading = true;

    try {
      const activities = await getActivities();
      runInAction("loading activity", () => {
        activities.forEach((activity) => {
          this.activities.set(activity.id, {
            ...activity,
            date: new Date(activity.date),
          });
        });
      });
    } finally {
      runInAction(() => (this.loading = false));
    }
  };

  @action loadActivity = async (id: string) => {
    if (this.activities.has(id)) {
      const activity = this.activities.get(id)!;
      this.selectedActivity = activity;
      return activity;
    } else {
      this.loading = true;

      try {
        const activity = await getActivity(id);
        runInAction("getting activity", () => {
          activity.date = new Date(activity.date);
          this.selectedActivity = activity;
        });
        return activity;
      } finally {
        runInAction(() => (this.loading = false));
      }
    }
  };

  @action clearActivity = () => {
    this.selectedActivity = null;
  };

  @action createActivity = async (activity: Activity) => {
    this.submitting = true;

    try {
      const id = await createActivity(activity);

      runInAction("creating activity", () => {
        this.activities.set(activity.id, activity);
      });

      return id;
    } finally {
      runInAction(() => (this.submitting = false));
    }
  };

  @action editActivity = async (activity: Activity) => {
    this.submitting = true;

    try {
      await editActivity(activity);

      runInAction("editing activity", () => {
        this.activities.set(activity.id, activity);
        this.selectedActivity = activity;
      });
    } finally {
      runInAction(() => (this.submitting = false));
    }
  };

  @action deleteActivity = async (id: string) => {
    this.submitting = true;

    try {
      await deleteActivity(id);

      runInAction("deleting activity", () => this.activities.delete(id));
    } finally {
      runInAction(() => (this.submitting = false));
    }
  };
}

const store = createContext(new ActivityStore());

export { store as ActivityStore };

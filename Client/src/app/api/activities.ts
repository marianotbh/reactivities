import { Activity } from "../models/Activity";
import { GET, POST, PUT, DELETE } from ".";

export function getActivities() {
  return GET<Activity[]>(`/activities`);
}

export function getActivity(id: string) {
  return GET<Activity>(`/activities/${id}`);
}

export function createActivity(body: Activity) {
  return POST<{ id: string }>(`/activities`, body);
}

export function editActivity(body: Activity) {
  return PUT(`/activities/${body.id}`, body);
}

export function deleteActivity(id: string) {
  return DELETE(`/activities/${id}`);
}

import { Activity } from "../models/Activity";
import { GET, POST, PUT, DELETE } from "./agent";

export async function getActivities() {
	return GET<Activity[]>(`/activities`);
}

export async function getActivity(id: string) {
	return GET<Activity>(`/activities/${id}`);
}

export async function createActivity(body: Activity) {
	return POST(`/activities`, body);
}

export async function editActivity(body: Activity) {
	return PUT(`/activities/${body.id}`, body);
}

export async function deleteActivity(id: string) {
	return DELETE(`/activities/${id}`);
}

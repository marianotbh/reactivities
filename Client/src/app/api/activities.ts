import { IActivity } from "../models/activity";
import * as agent from "./agent";

export async function getActivities() {
	return agent.GET<IActivity[]>(`/activities`);
}

export async function getDetails(id: string) {
	return agent.GET<IActivity>(`/activities/${id}`);
}

export async function createActivity(body: IActivity) {
	return agent.POST(`/activities`, body);
}

export async function editActivity(body: IActivity) {
	return agent.PUT(`/activities/${body.id}`, body);
}

export async function deleteActivity(id: string) {
	return agent.DELETE(`/activities/${id}`);
}

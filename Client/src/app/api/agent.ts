import axios from "axios";
import { history } from "../layout/history";
import { toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:5000/api";
axios.interceptors.response.use(undefined, error => {
	if (error.message === "Network Error" && !error.response) {
		toast.error("Network error");
	} else {
		const { status, data, config } = error.response;

		switch (status) {
			case 404:
				history.push("/not-found");
				break;
			case 400:
				if (config.method === "get" && "id" in data.errors) history.push("/not-found");
				break;
			case 500:
				toast.error("oops! something went wrong");
				break;
		}
	}

	throw error;
});

async function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export async function GET<T = {}>(url: string) {
	await sleep(250);
	return (await axios.get<T>(url)).data;
}

export async function POST<T = {}>(url: string, body: {}) {
	await sleep(1000);
	return (await axios.post<T>(url, body)).data;
}

export async function PUT<T = {}>(url: string, body: {}) {
	await sleep(1000);
	return (await axios.put<T>(url, body)).data;
}

export async function PATCH<T = {}>(url: string, body: {}) {
	await sleep(1000);
	return (await axios.patch<T>(url, body)).data;
}

export async function DELETE<T = {}>(url: string) {
	await sleep(1000);
	return (await axios.delete<T>(url)).data;
}

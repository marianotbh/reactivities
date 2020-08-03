import axios from "axios";

const agent = axios.create({
	baseURL: "http://localhost:5000/api"
});

async function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export async function GET<T = {}>(url: string) {
	const { data } = await agent.get<T>(url);
	await sleep(250);
	return data;
}

export async function POST<T = {}>(url: string, body: {}) {
	const { data } = await agent.post<T>(url, body);
	await sleep(1000);
	return data;
}

export async function PUT<T = {}>(url: string, body: {}) {
	const { data } = await agent.put<T>(url, body);
	await sleep(1000);
	return data;
}

export async function PATCH<T = {}>(url: string, body: {}) {
	const { data } = await agent.patch<T>(url, body);
	await sleep(1000);
	return data;
}

export async function DELETE<T = {}>(url: string) {
	const { data } = await agent.delete<T>(url);
	await sleep(1000);
	return data;
}

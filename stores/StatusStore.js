import { writable } from "svelte/store";
import { getFetch } from "../src/FetchManager";
export const statuses = writable([]);
export function makeStatusStore() {
	const loading = writable(false);
	const error = writable(false);
	async function fetchStatuses(boardId) {
		loading.set("Loading statuses");
		error.set(false);
		try {
			const value = await getFetch(`/api/${boardId}/statuses`);
			statuses.update(data => data.concat(value));
		} catch(e) {
			error.set(e);
		}
		loading.set(false);
	}
	return [statuses, loading, error, fetchStatuses];
}

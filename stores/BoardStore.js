import { writable } from "svelte/store";
export const data = writable({});
export function getBoards() {
	const loading = writable(false);
	const error = writable(false);

	async function get() {
		loading.set("Hahaha loading");
		error.set(false);
		try {
			const response = await fetch("/api/boards");
			data.set(await response.json());
		} catch(e) {
			error.set(e);
		}
		loading.set(false);
	}
	get()
	return [data, loading, error, get];
}

export function deleteBoard(boardId){
	async function deleteBoard(boardId) {
		const response = await fetch(`/api/delete/board/${boardId}`,{method: "DELETE"});
	}
	deleteBoard(boardId);
}
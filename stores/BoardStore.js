import { writable } from "svelte/store";
import { getFetch, deleteFetch } from "../src/FetchManager";
export const data = writable({});
export function getBoards() {
	const loading = writable(false);
	const error = writable(false);

	async function loadBoards() {
		loading.set("Hahaha loading");
		error.set(false);
		try {
			const boards = await getFetch("/api/boards");
			data.set(boards);
		} catch(e) {
			error.set(e);
		}
		loading.set(false);
	}
	loadBoards();
	return [data, loading, error, loadBoards];
}

export async function deleteBoard(boardId){
	await deleteFetch(`/api/delete/board/${boardId}`);
}
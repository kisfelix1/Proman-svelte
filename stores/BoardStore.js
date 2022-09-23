import { writable } from "svelte/store";
import { getFetch } from "../src/FetchManager";
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

export function deleteBoard(boardId){
	async function deleteBoard(boardId) {
		const response = await fetch(`/api/delete/board/${boardId}`,{method: "DELETE"});
	}
	deleteBoard(boardId);
}
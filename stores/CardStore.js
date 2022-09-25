import { writable } from "svelte/store";
import { getFetch, deleteFetch, putFetch, postFetch } from "../src/FetchManager";
export const cards = writable([]);
export function makeCardsStore() {
	const loading = writable(false);
	const error = writable(false);
	async function fetchCards(boardId) {
		loading.set("Loading statuses");
		error.set(false);
		try {
			const value = await getFetch(`/api/boards/${boardId}/cards/`);
			cards.update(data => data.concat(value));
		} catch(e) {
			error.set(e);
		}
		loading.set(false);
	}
	return [cards, loading, error, fetchCards];
}

export async function fetchCards(boardId) {
	const value = await getFetch(`/api/boards/${boardId}/cards/`);
	cards.update(data => data.concat(value));
}

export async function deleteCard(cardId){
	await deleteFetch(`/api/remove/card/${cardId}`);
	cards.update(cards => cards.filter(card => card.id != cardId));
}

export async function renameCard(cardId, newTitle){
	await putFetch("/api/card/rename", {'id':cardId, 'title': newTitle});
}

export async function addCard(boardId){
	const newCard = await postFetch(`/api/create/card/${boardId}`);
	cards.update(data => data.concat(newCard));
}
import { readable, writable } from "svelte/store";
async function apiGet(url) {
    let response = await fetch(url, { method: "GET" });
    if (response.status === 200) {
        return response.json();
    }
}

async function getBoards() {
    const respone = await apiGet("/api/boards");
    return respone;
}
const boards = getBoards();
const BoardStore = writable(
    boards
)

export default BoardStore;
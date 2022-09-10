<script>
	import BoardStore from '../stores/BoardStore.js';
	import Board from "./Board.svelte";
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
	//$: boardPromise = getBoards();
	let boards = []
	BoardStore.subscribe((data)=> {
		boards = data;
	});
</script>

<div>
	{#await boards}
		<p>Loading</p>
	{:then boards}
		{#each boards as board}
			<Board boardId={board.id} title={board.title} />
		{/each}
	{:catch}
		<p style="color: red">
			Something terrible happened! Check if your server is running
		</p>
	{/await}
</div>

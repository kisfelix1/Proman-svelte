<script>
	console.log("asdasd");
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
	$: boardPromise = getBoards();
</script>

<div>
	{#await boardPromise}
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

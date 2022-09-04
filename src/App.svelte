<script>
	async function apiGet(url) {
  		let response = await fetch(url, {method: "GET"});
		if (response.status === 200) {
			return response.json();
		}
	}
	async function getBoards(){
		const respone = await apiGet("http://localhost:105/api/boards");
		return respone;
	}
	let boardPromise = getBoards();
</script> 
<div>
	{#await boardPromise}
	<p>Loading</p>
	{:then boards}
		{#each boards as board}
			 <h1>{board.title}</h1>
		{/each}
	{:catch}
		<p style="color: red">Something terrible happened! Check if your server is running</p>
	{/await}
</div>

<script>
	import {getBoards} from '../stores/BoardStore.js';
	import Board from './Board.svelte';
	import {postFetch, getFetch} from './FetchManager.js';
	const [data, loading, error, get] = getBoards();
	async function handleCreateBoard(){
		let response = await postFetch("/api/create/board/0");
		let newBoard = await getFetch(`/api/board/${response.id}`);
		data.update(boards => boards.concat(newBoard));
	}
</script>
<button on:click="{get}">
	Show All Boards
</button>

<div class="board-container">
	<button id="create-board" on:click={handleCreateBoard}>Create new board</button>
	{#if $loading}
		{$loading}
	{:else if $error}
		{$error}
	{:else}
		{#each $data as board}
			<Board boardId="{board.id}" title="{board.title}"></Board>
		{/each}
	{/if}
</div>
  

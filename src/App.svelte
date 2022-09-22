<script>
	import {getBoards} from '../stores/BoardStore.js';
	import Board from './Board.svelte';
	const [data, loading, error, get] = getBoards();
</script>
<button on:click="{get}">
	Show boards
</button>


{#if $loading}
	{$loading}
{:else if $error}
	{$error}
{:else}
	{#each $data as board}
		 <Board boardId="{board.id}" title="{board.title}"></Board>
	{/each}
{/if}
  

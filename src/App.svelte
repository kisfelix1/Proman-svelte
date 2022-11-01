<script>
	import {getBoards} from '../stores/BoardStore.js';
	import Board from './Board.svelte';
	import {postFetch, getFetch} from './FetchManager.js';
	const [data, loading, error, loadBoards] = getBoards();
	async function handleCreateBoard(){
		let response = await postFetch("/api/create/board/0");
		let newBoard = await getFetch(`/api/board/${response.id}`);
		data.update(boards => boards.concat(newBoard));
	}
	function decodeJwtResponse(token) {
        let base64Url = token.split('.')[1]
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload)
    }
	let profile;
	window.onSignIn  = (response) =>{
		profile = decodeJwtResponse(response.credential);
	}

	function onSingOut(){
		profile = null;
	}
</script>
<button on:click="{loadBoards}">
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

<div class="login-container">
	{#if profile != null}
		<button on:click={onSingOut}>Sign out from account: {profile.name}</button>
	{:else}
	<div class="login-item">
		<div id="g_id_onload"
			data-client_id="1064746059189-nmunfbtaqts8tlido7q3hhmf8j888esc.apps.googleusercontent.com"
			data-callback="onSignIn">
		</div>
		<div class="login-title">Log in with google</div>
		<div class="g_id_signin"
			data-type="standard"
			data-shape="rectangular"
			data-theme="outline"
			data-text="signin_with"
			data-size="large"
			data-logo_alignment="left">
		</div>
	</div>
	{/if}
		
</div>
  

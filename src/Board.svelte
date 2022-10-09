<script>
    import {cards, fetchCards, addCard } from "../stores/CardStore";
    import {deleteBoard, renameBoard, data} from '../stores/BoardStore.js';
    import {makeStatusStore} from '../stores/StatusStore.js';
    import Status from './Status.svelte';
    import { writable } from "svelte/store";
    const progress = writable(0);
    export let boardId;
    export let title;
    let editingTitle = false;
    let showBoardButtonState = false;
    const [statuses ,loading, error, fetchStatuses] = makeStatusStore(boardId);

    async function handleBoardDelete(boardIdToDelete){
        await deleteBoard(boardIdToDelete);
        if(boardId == boardIdToDelete){
            data.update(data => data.filter((board) => board.id != boardId));
        }
    }

    function handleShowCards(boardId){
        showBoardButtonState = !showBoardButtonState;
        showBoardButtonState ? fetchStatuses(boardId) : statuses.update(data=> data.filter(status => status.board_id != boardId))
        showBoardButtonState ? fetchCards(boardId) : cards.update(data=> data.filter(card => card.board_id != boardId))
    }

    function handleEditTitle(boardId){
        editingTitle=false;
        renameBoard(boardId, title);
    }
</script>
<section class="board" data-board-id="{boardId}">
    <progress class="board-progress" value="{$progress}"></progress>
    <div class="board-header">
    <span class="board-title" data-board-id="{boardId}" on:click={() => editingTitle = true}>
        {#if editingTitle}
            <input type="text" bind:value={title} on:blur={() => {handleEditTitle(boardId)}}>
        {:else}
            {title}
        {/if}
    </span>
    <button class="board-add" data-board-id="{boardId}" on:click={() => addCard(boardId)}>Add Card</button>
    <button class="board-remove" data-board-id="{boardId}" on:click={()=>{handleBoardDelete(boardId);}}>Delete board</button>
    <button class="toggle-board-button board-toggle" on:click={()=>{handleShowCards(boardId);}}>{showBoardButtonState ? "Hide Cards" : "Show Cards"}</button>
    </div>
    <div class="board-columns">
        {#if $loading}
	        {$loading}
        {:else if $error}
	        {$error}
        {:else}
            {#each $statuses as status}
                {#if status.board_id == boardId}
                    <Status title="{status.title}" boardId="{boardId}" position="{status.position}"></Status>
                {/if}
            {/each}
        {/if}
    </div>
</section>

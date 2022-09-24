<script>
    import {deleteBoard, renameBoard, data} from '../stores/BoardStore.js';
    import {makeStatusStore} from '../stores/StatusStore.js';
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
    }
    function handleEditTitle(boardId){
        editingTitle=false;
        renameBoard(boardId, title);
    }
</script>

<section class="board" data-board-id="{boardId}">
    <div class="board-header">
    <span class="board-title" data-board-id="{boardId}" on:click={() => editingTitle = true}>
        {#if editingTitle}
             <input type="text" bind:value={title} on:blur={() => {handleEditTitle(boardId)}}>
        {:else}
             {title}
        {/if}
    </span>
    <button class="board-add" data-board-id="{boardId}">Add Card</button>
    <button class="board-remove" data-board-id="{boardId}" on:click={()=>{handleBoardDelete(boardId);}}>Delete board</button>
    <button class="toggle-board-button board-toggle" on:click={()=>{handleShowCards(boardId);}}>Show Cards</button>
    </div>
    <div class="board-columns">
        {#if $loading}
	        {$loading}
        {:else if $error}
	        {$error}
        {:else}
            {#each $statuses as status}
                {#if status.board_id == boardId}
                    <div class="board-column" data-status-id="${status.id}" data-position="${status.position}"></div>
                    <div class="board-column-title">{status.title}</div>    
                    <div class="board-column-content"></div>
                {/if}
            {/each}
        {/if}
    </div>
</section>

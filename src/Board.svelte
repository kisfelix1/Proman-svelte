<script>
    import {deleteBoard, data} from '../stores/BoardStore.js';
    import {makeStatusStore} from '../stores/StatusStore.js';
    export let boardId;
    export let title;
    let showBoardButtonState = false;
    const [statuses ,loading, error, fetchStatuses] = makeStatusStore(boardId);
    function handleBoardDelete(boardIdToDelete){
        deleteBoard(boardIdToDelete);
        if(boardId == boardIdToDelete){
            data.update(data => data.filter((board) => board.id != boardId));
        }
    }

    function handleShowCards(boardId){
        showBoardButtonState = !showBoardButtonState;
        showBoardButtonState ? fetchStatuses(boardId) : statuses.update(data=> data.filter(status => status.board_id != boardId))
    }
</script>

<section class="board" data-board-id="{boardId}">
    <div class="board-header">
    <span class="board-title" data-board-id="{boardId}">{title}</span>
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

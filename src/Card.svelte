<script>
    import {deleteCard, renameCard} from '../stores/CardStore.js';
    export let title;
    export let cardId;
    let editingTitle = false;
    function handleEditTitle(boardId){
        editingTitle=false;
        renameCard(cardId, title);
    }
</script>

<div class="card" draggable="true">
    <div class="card-remove" on:click={()=> deleteCard(cardId)}><i class="fas fa-trash-alt" data-card-id="7" data-board-id="2"></i></div>
    <div class="card-title"  on:click={() => editingTitle = true}>
        {#if editingTitle}
            <input type="text" bind:value={title} on:blur={() => {handleEditTitle(cardId)}}>
        {:else}
            {title}
        {/if}
    </div>
</div>
<script>
    import Card from "./Card.svelte";
    import {cards} from "../stores/CardStore.js";
    export let boardId;
    export let title;
    export let position;
</script>


<div class="board-column">
    <div class="board-column-title">{title}</div>    
    <div class="board-column-content">
        {#each $cards as card}
            {#if card.board_id == boardId && card.position == position}
                <Card title="{card.title}" cardId="{card.id}"></Card>
            {/if}
        {/each}
    </div>
</div>
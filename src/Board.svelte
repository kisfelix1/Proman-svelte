<script>
    export let boardId;
    export let title;
    function deleteBoard(id){
        apiDelete(`/api/delete/board/${id}`);
    }
    async function apiDelete(url) {
        await fetch(url, {
            method: "DELETE",
    });
        if (response.status === 200) {
            return response.json();
  }
}
</script>

<section class="board" data-board-id="{boardId}">
    <div class="board-header">
    <span class="board-title" data-board-id="{boardId}">{title}</span>
    <button class="board-add" data-board-id="{boardId}">Add Card</button>
    <button class="board-remove" data-board-id="{boardId}" on:click={()=>{deleteBoard(boardId)}}>Delete board</button>
    <button class="toggle-board-button board-toggle" data-board-id="{boardId}">Show Cards</button>
    </div>
    <div class="board-columns"></div>
</section>

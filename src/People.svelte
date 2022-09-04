<script>
    export let showPeople = false;
	let people = [
		{name:'yoshi', beltColour:'black', age:25, id:1},
		{name:'asd', beltColour:'blue', age:22, id:2},
		{name:'dsaasdasi', beltColour:'red', age:21, id:3}
		];
	function personDelete(id){
		people = people.filter(person=> person.id != id);
	}
</script>
{#if showPeople}
<button on:click>Close modal</button>
<div>
    {#each people as person (person.id)}
        <div>
            <h1 class:fasz="{person.id % 2 == 0}">{person.name}</h1>
            <div class:fasz="{person.id % 2 == 0}">{person.id}</div>
            <button class:fasz="{person.id % 2 == 0}" on:click="{()=> personDelete(person.id)}">delete this person</button>
        </div>
        {:else}
        <p>Mi a fasz</p>
    {/each}
</div>
{/if}

<style>
    .fasz{
        color: aqua;
    }
	h1{
		color: red;
	}
</style>

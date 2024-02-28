<script lang="ts">
    import { getSession } from "$lib/sessionManager";
    import { goto } from '$app/navigation';

    function createGame(){
        fetch("tictactoe/api/?session=" + getSession())
        .then(response => {
            response.text().then((link: string) => {
                goto(link.substring(1, link.length - 1));
            })
        });
    }
</script>

<button on:click={() => createGame()} class="px-2 h-10 w-fit rounded-full bg-slate-300 hover:bg-slate-400">
    Create Lobby
</button>
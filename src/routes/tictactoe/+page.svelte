<script lang="ts">
    import { getSession } from "$lib/sessionManager";
    import { goto } from '$app/navigation';

    function createGame(){
        fetch("tictactoe/api/?session=" + getSession())
        .then(response => {
            if (response.status === 406) {
                alert("There are currently too many games running! \nPlease try again later!");
                console.log("There are currently too many games running! \nPlease try again later!");
                return;
            }
            response.text().then((link: string) => {
                goto(link.substring(1, link.length - 1));
            })
        });
    }
</script>

<div class="create-lobby">
    <button class="inner-div w-1/6 h-1/6 bg-gray-300 rounded-md hover:bg-gray-400"
    on:click={() => createGame()}>
        Create Lobby
    </button>
</div>

<style>
    .create-lobby {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100dvh;
        width: 100dvw;
    }
    .inner-div {
        display: flex;
        justify-content: center;
        align-items: center;
        -webkit-box-shadow: 0px 0px 44px 29px rgba(3,44,255,0.69); 
        box-shadow: 0px 0px 44px 29px rgba(3,44,255,0.69);
    }
</style>
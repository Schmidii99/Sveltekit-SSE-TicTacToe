<script lang="ts">
	import { browser } from '$app/environment';
	import type { GameInfo } from '$lib/TwoPlayerGame.js';
	import { getSession } from '$lib/sessionManager.js';
	import { source } from 'sveltekit-sse';
    import type { PageData } from './$types.js';

    export let data: PageData;

    let gameInfo: GameInfo | null = null;
    let gameState: number[][] = [];
    let winner: string | null = null;

    $: if (data.gameId != null && browser && gameInfo == null){
            const connection = source(`/tictactoe/game/${data.gameId}/${getSession()}/`, {close({connect}) {
                if (calculateWinner() == null) {
                    console.log("Connection to server closed! Reconnecting...");
                    connect();
                } else {
                    console.log("Connection to server closed! Game over!");
                }
            }})
            connection.select("gameState").json<number[][]>().subscribe(gs => {
                if (gs != null) {
                    gameState = gs;
                }
            });
            connection.select("gameInfo").json<GameInfo>().subscribe(gi => {
                if (gi != null) {
                    gameInfo = gi;
                }
            });
    }

    // check for winner
    $: if (browser && gameState.length > 0) {
        winner = calculateWinner();
    }

    function calculateWinner(): null | string {
        for (let i = 0; i < 3; i++) {
            // row
            if (gameState[i][0] === gameState[i][1] && gameState[i][1] === gameState[i][2] && gameState[i][0] !== 0) {
                return gameState[i][0] === 1 ? "X" : "O";
            }
            // row
            if (gameState[0][i] === gameState[1][i] && gameState[1][i] === gameState[i][2] && gameState[0][i] !== 0) {
                return gameState[0][i] === 1 ? "X" : "O";
            }
        }
        // diagonal
        if (gameState[0][0] === gameState[1][1] && gameState[1][1] === gameState[2][2] && gameState[0][0] !== 0) {
            return gameState[0][0] === 1 ? "X" : "O";
        }
        if (gameState[0][2] === gameState[1][1] && gameState[1][1] === gameState[2][0] && gameState[0][2] !== 0) {
            return gameState[0][2] === 1 ? "X" : "O";
        }

        // check for draw
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (gameState[i][j] === 0) {
                    return null;
                }
            }
        }

        return "-";
    }

    // handle button click
    function handleButtonClick(row: number, col: number) {
        if (gameInfo?.spectator || !gameInfo?.yourTurn || winner != null)
            return;
        
        fetch("/tictactoe/api/", {
            method: "POST",
            body: JSON.stringify({
                gameId: data.gameId,
                session: getSession(),
                column: col,
                row: row
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(res => res.json().then(js => console.log(js)));
    }
</script>

{#if gameInfo != null && gameInfo.spectator}
    <div class="flex justify-center">
        <h2 class=" underline text-2xl">You are spectating the game!</h2>
    </div>
{/if}

<div class="flex justify-center text-center">
    <h2 class="text-xl">
        {#if gameInfo != null && gameInfo.symbol != null}
            Your symbol: {gameInfo.symbol}
            <br>
        {/if}
        {#if gameInfo != null && gameInfo.yourTurn && winner == null}
            Your Turn
        {:else if gameInfo != null && gameInfo?.gameStarted && !gameInfo.yourTurn && !gameInfo.spectator && winner == null}
            Opponents Turn
        {:else if winner != null}
            Player {winner} Wins!
        {/if}
    </h2>
</div>

{#if gameInfo != null && gameInfo.gameStarted}
    <div class=" w-full h-full space-y-3 mt-5">
        {#each gameState as row, rowIndex (rowIndex)}
            <div class="flex justify-center items-center space-x-3">
                {#each row as col, colIndex (colIndex)}
                    <button class=" bg-gray-300 rounded-lg lg:rounded-2xl box sm:text-2xl md:text-5xl lg:text-8xl"
                    on:click={() => handleButtonClick(rowIndex, colIndex)}>
                        {#if col == 1}X{/if}
                        {#if col == 2}O{/if}
                    </button>
                {/each}
            </div>
        {/each}
    </div>
{/if}


{#if gameInfo != null && !gameInfo?.gameStarted}
    <div class="waiting-popup sm:rounded-lg md:rounded-xl lg:rounded-3xl bg-gray-300">
        <div class="mt-5">
            Waiting for opponent...
        </div>
        <div class="wrapper mt-8">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="shadow"></div>
            <div class="shadow"></div>
            <div class="shadow"></div>
        </div>
    </div>
{/if}

<style>
    .box {
        height: min(20dvh, 20dvw);
        width: min(20dvh, 20dvw);
    }
    .waiting-popup {
        display: flex;
        align-items: center;
        flex-direction: column;
        position: absolute;
        top: 10dvh;
        left: 30dvw;
        height: 80dvh;
        width: 40dvw;
    }

    /* This is from the loader */
    .wrapper {
        width: 200px;
        height: 60px;
        position: relative;
        z-index: 1;
    }

    .circle {
    width: 20px;
    height: 20px;
    position: absolute;
    border-radius: 50%;
    background-color: #fff;
    left: 15%;
    transform-origin: 50%;
    animation: circle7124 .5s alternate infinite ease;
    }

    @keyframes circle7124 {
    0% {
        top: 60px;
        height: 5px;
        border-radius: 50px 50px 25px 25px;
        transform: scaleX(1.7);
    }

    40% {
        height: 20px;
        border-radius: 50%;
        transform: scaleX(1);
    }

    100% {
        top: 0%;
    }
    }

    .circle:nth-child(2) {
    left: 45%;
    animation-delay: .2s;
    }

    .circle:nth-child(3) {
    left: auto;
    right: 15%;
    animation-delay: .3s;
    }

    .shadow {
    width: 20px;
    height: 4px;
    border-radius: 50%;
    background-color: rgba(0,0,0,0.9);
    position: absolute;
    top: 62px;
    transform-origin: 50%;
    z-index: -1;
    left: 15%;
    filter: blur(1px);
    animation: shadow046 .5s alternate infinite ease;
    }

    @keyframes shadow046 {
    0% {
        transform: scaleX(1.5);
    }

    40% {
        transform: scaleX(1);
        opacity: .7;
    }

    100% {
        transform: scaleX(.2);
        opacity: .4;
    }
    }

    .shadow:nth-child(4) {
    left: 45%;
    animation-delay: .2s
    }

    .shadow:nth-child(5) {
    left: auto;
    right: 15%;
    animation-delay: .3s;
    }

</style>
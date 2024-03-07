import { error } from '@sveltejs/kit';
import { events } from 'sveltekit-sse';
import { currentGames } from '../../../GameManager.js';
import { Client } from '$lib/Client.js';

export async function POST({ request, params }) {
    if (params.session == null || params.gameId == null) {
        error(404, "Game not found!");
    }
    return events({
        request,
        start({emit}) {
            console.log("client connected!");
            if (!currentGames.has(params.gameId)) { error(404, "Game not found!"); }

            const game = currentGames.get(params.gameId)!;
            // player one
            if (game.playerOne == null || game.playerOne.session == params.session) {
                game.playerOne = new Client(emit, params.session);
            }
            // player two && game not started 
            else if (!game.gameStarted) {
                game.start(emit, params.session);
                console.log("Game started!");
                game.playerOne.send("gameInfo", JSON.stringify(game.getGameInfo(game.playerOne.session)));
            }
            emit("gameInfo", JSON.stringify(game.getGameInfo(params.session)));
            emit("gameState", JSON.stringify(game!.gameState));

            emit("test", JSON.stringify(game));
        },
        cancel() {
            console.log("Connection cancelled");
        }
    })
}
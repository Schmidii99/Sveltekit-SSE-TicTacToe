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
            if (game.playerOne == null) {
                game.playerOne = new Client(emit, params.session);
            } else {
                game.start(emit, params.session);
                console.log("Game started!");
                game.playerOne.send("gameInfo", JSON.stringify(game.getGameInfo(game.playerOne.session)));
            }
            emit("gameInfo", JSON.stringify(game.getGameInfo(params.session)));
            emit("gameState", JSON.stringify(game!.gameState));
        },
        cancel() {
            console.log("Connection cancelled");
        }
    })
}
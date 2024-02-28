import { error, json, text } from "@sveltejs/kit";
import { TwoPlayerGame } from "$lib/TwoPlayerGame";
import { makeId } from "$lib/utilities.js";

let currentGames: Map<string, TwoPlayerGame> = new Map<string, TwoPlayerGame>();

export function GET({ url }) {	
    if (url.searchParams.get('session') == null) { error(400, "session not set!"); }
    const session: string = url.searchParams.get('session')!;

    if (url.searchParams.get('gameId') == null) {
        // create new game and generate Link
        let link: string = makeId(8);
        while (currentGames.has(link)) {
            link = makeId(8);
        }
        // create game with session
        currentGames.set(link, new TwoPlayerGame(session, 
                                                 null, 
                                                 [[0, 0, 0],[0, 0, 0],[0, 0, 0]]))
        return json(`/tictactoe/game/${link}/`);
    }

	const gameId: string = url.searchParams.get('gameId')!;
	
	if (!currentGames.has(gameId)) {
        error(404, "Game not found!");
    }

    let game = currentGames.get(gameId);

    // check if he is the second one to join
    if (game?.playerTwoSession == null && session != game?.playerOneSession) {
        game?.start(session);
    }

    let symbol = null;
    if (game?.playerOneSession == session) { symbol = game?.playerOneSymbol; }
    if (game?.playerTwoSession == session) { symbol = game?.playerTwoSymbol; }

	return json(
        {
            "gameState": game?.gameState,
            "gameStarted": game?.gameStarted,
            "yourTurn": game?.currentPlayer == session,
            "spectator": session != game?.playerOneSession && session != game?.playerTwoSession,
            "yourSymbol": symbol 
        }
    );
}

export async function POST({ request }) {	
    // TODO
    return json("TODO");
}

// This handler will respond to PATCH, DELETE, etc.
export async function fallback({ request }) {
	return text(`Method ${request.method} not supported!`);
}
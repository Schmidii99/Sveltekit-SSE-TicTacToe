import { error, json, text } from "@sveltejs/kit";
import { TwoPlayerGame } from "$lib/TwoPlayerGame";
import { makeId } from "$lib/utilities.js";
import { currentGames } from "../GameManager.js";

export function GET({ url }) {	
    if (url.searchParams.get('session') == null) { error(400, "session not set!"); }
    const session: string = url.searchParams.get('session')!;

    // create new game and generate Link
    let link: string = makeId(8);
    while (currentGames.has(link)) {
        link = makeId(8);
    }
    // create game
    currentGames.set(link, new TwoPlayerGame([[0, 0, 0],[0, 0, 0],[0, 0, 0]]))
    return json(`/tictactoe/game/${link}/`);
}

export async function POST({ request }) {	
    let postData: any = null;
    // extract post data
    await request.json().then(e => postData = e);

    if (postData["gameId"] == null || postData["session"] == null) { error(400, "gameId or session not set!"); }
    const recievedSession = postData["session"];
    if (!currentGames.has(postData["gameId"])) { error(404, "Game not found!"); }
    const recievedGame: TwoPlayerGame = currentGames.get(postData["gameId"])!;

    // check if player is allowed to make a move
    if (recievedGame.currentPlayer?.session != recievedSession) { error(401); }

    // check if column and row are set and in the right format
    if (postData["column"] == null || postData["row"] == null || isNaN(Number(postData["column"])) || isNaN(Number(postData["row"]))) 
    { error(400, "row or column not set or not a number!"); }
    if (Number(postData["column"]) > 2 || Number(postData["column"]) < 0 || Number(postData["row"]) > 2 || Number(postData["row"]) < 0) 
    { error(400, "row or column out of bounds!"); }

    const row = postData["row"];
    const col = postData["column"];
    const currentState: number[][] = recievedGame.gameState;

    if (currentState[row][col] != 0) {
        error(400, "invalid position!");
    }

    recievedGame!.updateGameState(row, col, recievedGame.currentPlayer?.session == recievedGame.playerOne?.session ? 1 : 2);

    recievedGame.informPlayer();

    return new Response(null, { status: 202 });
}

// This handler will respond to PATCH, DELETE, etc.
export async function fallback({ request }) {
	return error(405, `Method ${request.method} not allowed!`);
}
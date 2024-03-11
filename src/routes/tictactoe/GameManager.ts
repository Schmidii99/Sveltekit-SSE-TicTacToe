import type { TwoPlayerGame } from "$lib/TwoPlayerGame";

export let currentGames: Map<string, TwoPlayerGame> = new Map<string, TwoPlayerGame>();

const TIME_LIMIT = 600; // in Seconds

export function clearGames() {
    const currentTime: number = Date.now();
    const games = Array.from(currentGames.values());

    const keys = Array.from(currentGames.keys());
    for (let i = 0; i < games.length; i++) {
        if (currentTime - games[i].timeCreated > TIME_LIMIT * 1000) {
            console.log("Deleting game because it exceeded 10 minutes");
            games[i].playerOne?.send("disconnect", "Timelimit exceeded. Game deleted!");
            games[i].playerTwo?.send("disconnect", "Timelimit exceeded. Game deleted!");
            games[i].spectators.forEach((spectator) => {
                spectator.send("disconnect", "Timelimit exceeded. Game deleted!");
            })
            currentGames.delete(keys[i]);
        }
    }
}
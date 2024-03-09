import { Client } from "./Client";

export class TwoPlayerGame {
    playerOne: Client | null = null;
    playerTwo: Client | null = null;
    // 0 is empty - 1 is player One - 2 is player Two
    gameState: number[][];
    gameStarted: boolean
    currentPlayer: Client | null

    constructor(startState: any) {
        this.gameState = startState;
        this.gameStarted = false;
        this.currentPlayer = null;
    }

    start(playerTwoEmit: (eventName: string, data: string) => any, playerTwoSession: string) {
        if (this.gameStarted == true) { return; }
        if (this.playerOne == null || this.playerTwo != null) { return; }

        this.gameStarted = true;
        this.playerTwo = new Client(playerTwoEmit, playerTwoSession);
        this.currentPlayer = Math.random() < 0.5 ? this.playerOne : this.playerTwo;
        if (this.currentPlayer.session == this.playerTwo.session) {
            let tmp = this.playerOne;
            this.playerOne = this.playerTwo;
            this.playerTwo = tmp;
        }
        this.playerOne.symbol = this.currentPlayer.session == this.playerOne.session ? "X" : "O";
        this.playerTwo.symbol = this.playerOne.symbol == "X" ? "O" : "X";
    }

    setGameState(gameState: any) {
        this.gameState = gameState;
    }
    updateGameState(row: number, column: number, number: number) {
        this.gameState[row][column] = number;
        this.currentPlayer = this.currentPlayer == this.playerOne ? this.playerTwo : this.playerOne;
    }

    getGameInfo(session: string): GameInfo {
        let yourTurn: boolean = false;
        if (this.currentPlayer == this.playerOne && this.playerOne != null && session == this.playerOne.session) {
            yourTurn = true;
        }
        if (this.currentPlayer == this.playerTwo && this.playerTwo != null && session == this.playerTwo.session) {
            yourTurn = true;
        }

        let spectator: boolean = true;
        if (session === this.playerOne?.session || session === this.playerTwo?.session) {
            spectator = false;
        }

        let symbol: string | null = null;
        if (session === this.playerOne?.session) {
            symbol = this.playerOne.symbol;
        }
        if (session === this.playerTwo?.session) {
            symbol = this.playerTwo.symbol;
        }

        return { 
            gameStarted: this.gameStarted, 
            yourTurn: yourTurn, 
            spectator: spectator, 
            symbol: symbol 
        };
    }

    informPlayer() {
        if (this.playerOne != null) {
            this.playerOne.send("gameInfo", JSON.stringify(this.getGameInfo(this.playerOne.session)));
            this.playerOne.send("gameState", JSON.stringify(this.gameState));
        }
        if (this.playerTwo != null) {
            this.playerTwo.send("gameInfo", JSON.stringify(this.getGameInfo(this.playerTwo.session)));
            this.playerTwo.send("gameState", JSON.stringify(this.gameState));
        }
    }
}

export type GameInfo = {
    gameStarted:    boolean,
    yourTurn:       boolean,
    spectator:      boolean 
    symbol:         string | null 
}
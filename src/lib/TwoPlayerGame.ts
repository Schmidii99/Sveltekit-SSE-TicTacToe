import { Client } from "./Client";

export class TwoPlayerGame {
    playerOne: Client | null = null;
    playerTwo: Client | null = null;
    // 0 is empty - 1 is player One - 2 is player Two
    gameState: number[][];
    gameStarted: boolean
    currentPlayer: Client | null
    winnerSymbol: string | null = null;

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
        this.playerOne.symbol = this.currentPlayer == this.playerOne ? "X" : "O";
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

        let winner = this.checkForWinner();
        console.log("Winner: " + winner);
        if (winner != "") {
            this.winnerSymbol = winner;
        }

        return { 
            gameStarted: this.gameStarted, 
            winner: this.winnerSymbol,
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

    // X (player X) O (player O) or - (draw) or "" (game did not end yet)
    checkForWinner(): string {
        if (this.gameState == null) { return ""; }

        // check for tictactoe
        if (this.gameState.length == 3) {
            // check if every cell is filled
            this.gameState.forEach(row => {
                row.forEach(cell => {
                    if (cell == 0) { return ""; }
                })
            })

            for (let i = 0; i < 3; i++) {
                // row
                if (this.gameState[i][0] === this.gameState[i][1] && this.gameState[i][1] === this.gameState[i][2]) {
                    return this.gameState[i][0] === 1 ? this.playerOne!.symbol! : this.playerTwo!.symbol!;
                }
                // row
                if (this.gameState[0][i] === this.gameState[1][i] && this.gameState[1][i] === this.gameState[i][2]) {
                    return this.gameState[0][i] === 1 ? this.playerOne!.symbol! : this.playerTwo!.symbol!;
                }
            }
            // diagonal
            if (this.gameState[0][0] === this.gameState[1][1] && this.gameState[1][1] === this.gameState[2][2]) {
                return this.gameState[0][0] === 1 ? this.playerOne!.symbol! : this.playerTwo!.symbol!;
            }
            if (this.gameState[0][2] === this.gameState[1][1] && this.gameState[1][1] === this.gameState[2][0]) {
                return this.gameState[0][2] === 1 ? this.playerOne!.symbol! : this.playerTwo!.symbol!;
            }
            return "-";
        }
        // not tictactoe
        return "";
    }
}

export type GameInfo = {
    gameStarted:    boolean,
    winner:        string | null,
    yourTurn:       boolean,
    spectator:      boolean 
    symbol:         string | null 
}
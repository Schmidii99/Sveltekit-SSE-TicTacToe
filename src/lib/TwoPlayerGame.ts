export class TwoPlayerGame {
    playerOneSession: string
    playerOneSymbol: string | null
    playerTwoSession: string | null
    playerTwoSymbol: string | null
    gameState: any
    gameStarted: boolean
    currentPlayer: string | null

    constructor(pOne: string, pTwo: string | null = null, state: any) {
        this.playerOneSession = pOne;
        this.playerTwoSession = pTwo;
        this.gameState = state;
        this.gameStarted = false;
        this.currentPlayer = null;
        this.playerOneSymbol = null;
        this.playerTwoSymbol = null;
    }

    start(pTwoSession: string) {
        if (this.gameStarted == true) { return; }

        this.gameStarted = true;
        this.playerTwoSession = pTwoSession;
        this.currentPlayer = Math.random() < 0.5 ? this.playerOneSession : this.playerTwoSession;
        this.playerOneSymbol = this.currentPlayer == this.playerOneSession ? "X" : "O";
        this.playerTwoSymbol = this.playerOneSymbol == "X" ? "O" : "X";
    }
}
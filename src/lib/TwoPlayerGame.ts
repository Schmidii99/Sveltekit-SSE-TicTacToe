export class TwoPlayerGame {
    playerOneSession: string
    playerTwoSession: string | null
    gameState: any
    gameStarted: boolean
    currentPlayer: string | null

    constructor(pOne: string, pTwo: string | null = null, state: any) {
        this.playerOneSession = pOne;
        this.playerTwoSession = pTwo;
        this.gameState = state;
        this.gameStarted = false;
        this.currentPlayer = null;
    }

    start(pTwoSession: string) {
        if (this.gameStarted == true) { return; }

        this.gameStarted = true;
        this.playerTwoSession = pTwoSession;
        this.currentPlayer = Math.random() < 0.5 ? this.playerOneSession : this.playerTwoSession;
    }
}
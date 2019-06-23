export enum Player {
    playerOne = 1,
    playerTwo = 2
}

export enum TileValue {
    empty = 0,
    playerOne = Player.playerOne,
    playerTwo = Player.playerTwo
}

export enum GameMark {
    playerOneMark = 'x',
    playerTwoMark = 'o'
}

export interface IGameSettings {
    boardWidth: number;
    boardHeight: number;
    tilesInRowToWin: number;
}

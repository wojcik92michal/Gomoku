import { isWinningMove } from './GomokuValidation.utils';
import { TileValue, IGameSettings } from '../Gomoku.definitions';
import { ITilePosition } from '../Board/Tile/Tile.definition';

const empty = TileValue.empty;
const pOne = TileValue.playerOne;
const expectedValue = TileValue.playerOne;

let correctTiles: TileValue[][];
let tooManyTiles: TileValue[][];
let notEnoughTiles: TileValue[][];

function runIsWinningMoveTest(
    position: ITilePosition,
    tiles: TileValue[][],
    expectedResult: boolean
) {
    const mockGameSettings: IGameSettings = {
        boardHeight: 5,
        boardWidth: 5,
        tilesInRowToWin: 3
    };

    const result = isWinningMove(
        tiles,
        position,
        expectedValue,
        mockGameSettings
    );

    expect(result).toEqual(expectedResult);
}

describe('left-to-right winning conditions', () => {
    beforeEach(() => {
        correctTiles = [
            [pOne, pOne, pOne, empty, empty],
            [empty, empty, empty, empty, empty],
            [empty, empty, empty, empty, empty],
            [empty, empty, empty, empty, empty],
            [empty, empty, empty, empty, empty]
        ];

        tooManyTiles = [
            [pOne, pOne, pOne, pOne, empty],
            [empty, empty, empty, empty, empty],
            [empty, empty, empty, empty, empty],
            [empty, empty, empty, empty, empty],
            [empty, empty, empty, empty, empty]
        ];

        notEnoughTiles = [
            [empty, pOne, pOne, empty, empty],
            [empty, empty, empty, empty, empty],
            [empty, empty, empty, empty, empty],
            [empty, empty, empty, empty, empty],
            [empty, empty, empty, empty, empty]
        ];
    });

    describe('move at the beginning of a "row"', () => {
        it('should return true, because there is a correct number of tiles', () => {
            runIsWinningMoveTest({ x: 0, y: 0 }, correctTiles, true);
        });

        it('should return false, because there is too many tiles in a row', () => {
            runIsWinningMoveTest({ x: 0, y: 0 }, tooManyTiles, false);
        });
    });

    describe('move in the middle of a "row"', () => {
        it('should return true, because there is a correct number of tiles', () => {
            runIsWinningMoveTest({ x: 1, y: 0 }, correctTiles, true);
        });

        it('should return false, because there is too many tiles in a row', () => {
            runIsWinningMoveTest({ x: 1, y: 0 }, tooManyTiles, false);
        });

        it('should return false, because there is not enough tiles in a row', () => {
            runIsWinningMoveTest({ x: 1, y: 0 }, notEnoughTiles, false);
        });
    });

    describe('move at the end of a "row"', () => {
        it('should return true, because there is a correct number of tiles', () => {
            runIsWinningMoveTest({ x: 2, y: 0 }, correctTiles, true);
        });

        it('should return false, because there is too many tiles in a row', () => {
            runIsWinningMoveTest({ x: 2, y: 0 }, tooManyTiles, false);
        });
    });
});

describe('top-to-bottom winning conditions', () => {
    beforeEach(() => {
        correctTiles = [
            [pOne, empty, empty, empty, empty],
            [pOne, empty, empty, empty, empty],
            [pOne, empty, empty, empty, empty],
            [empty, empty, empty, empty, empty],
            [empty, empty, empty, empty, empty]
        ];

        tooManyTiles = [
            [pOne, empty, empty, empty, empty],
            [pOne, empty, empty, empty, empty],
            [pOne, empty, empty, empty, empty],
            [pOne, empty, empty, empty, empty],
            [empty, empty, empty, empty, empty]
        ];

        notEnoughTiles = [
            [empty, empty, empty, empty, empty],
            [pOne, empty, empty, empty, empty],
            [pOne, empty, empty, empty, empty],
            [empty, empty, empty, empty, empty],
            [empty, empty, empty, empty, empty]
        ];
    });

    describe('move at the beginning of a "row"', () => {
        it('should return true, because there is a correct number of tiles', () => {
            runIsWinningMoveTest({ x: 0, y: 0 }, correctTiles, true);
        });

        it('should return false, because there is too many tiles in a row', () => {
            runIsWinningMoveTest({ x: 0, y: 0 }, tooManyTiles, false);
        });
    });

    describe('move in the middle of a "row"', () => {
        it('should return true, because there is a correct number of tiles', () => {
            runIsWinningMoveTest({ x: 0, y: 1 }, correctTiles, true);
        });

        it('should return false, because there is too many tiles in a row', () => {
            runIsWinningMoveTest({ x: 0, y: 1 }, tooManyTiles, false);
        });

        it('should return false, because there is not enough tiles in a row', () => {
            runIsWinningMoveTest({ x: 0, y: 1 }, notEnoughTiles, false);
        });
    });

    describe('move at the end of a "row"', () => {
        it('should return true, because there is a correct number of tiles', () => {
            runIsWinningMoveTest({ x: 0, y: 2 }, correctTiles, true);
        });

        it('should return false, because there is too many tiles in a row', () => {
            runIsWinningMoveTest({ x: 0, y: 2 }, tooManyTiles, false);
        });
    });
});

describe('leftTop-to-bottomRight winning conditions', () => {
    beforeEach(() => {
        correctTiles = [
            [pOne, empty, empty, empty, empty],
            [empty, pOne, empty, empty, empty],
            [empty, empty, pOne, empty, empty],
            [empty, empty, empty, empty, empty],
            [empty, empty, empty, empty, empty]
        ];

        tooManyTiles = [
            [pOne, empty, empty, empty, empty],
            [empty, pOne, empty, empty, empty],
            [empty, empty, pOne, empty, empty],
            [empty, empty, empty, pOne, empty],
            [empty, empty, empty, empty, empty]
        ];

        notEnoughTiles = [
            [empty, empty, empty, empty, empty],
            [empty, pOne, empty, empty, empty],
            [empty, empty, pOne, empty, empty],
            [empty, empty, empty, empty, empty],
            [empty, empty, empty, empty, empty]
        ];
    });

    describe('move at the beginning of a "row"', () => {
        it('should return true, because there is a correct number of tiles', () => {
            runIsWinningMoveTest({ x: 0, y: 0 }, correctTiles, true);
        });

        it('should return false, because there is too many tiles in a row', () => {
            runIsWinningMoveTest({ x: 0, y: 0 }, tooManyTiles, false);
        });
    });

    describe('move in the middle of a "row"', () => {
        it('should return true, because there is a correct number of tiles', () => {
            runIsWinningMoveTest({ x: 1, y: 1 }, correctTiles, true);
        });

        it('should return false, because there is too many tiles in a row', () => {
            runIsWinningMoveTest({ x: 1, y: 1 }, tooManyTiles, false);
        });

        it('should return false, because there is not enough tiles in a row', () => {
            runIsWinningMoveTest({ x: 1, y: 1 }, notEnoughTiles, false);
        });
    });

    describe('move at the end of a "row"', () => {
        it('should return true, because there is a correct number of tiles', () => {
            runIsWinningMoveTest({ x: 2, y: 2 }, correctTiles, true);
        });

        it('should return false, because there is too many tiles in a row', () => {
            runIsWinningMoveTest({ x: 2, y: 2 }, tooManyTiles, false);
        });
    });
});

describe('rigtTop-to-bottomLeft winning conditions', () => {
    beforeEach(() => {
        correctTiles = [
            [empty, empty, empty, empty, pOne],
            [empty, empty, empty, pOne, empty],
            [empty, empty, pOne, empty, empty],
            [empty, empty, empty, empty, empty],
            [empty, empty, empty, empty, empty]
        ];

        tooManyTiles = [
            [empty, empty, empty, empty, pOne],
            [empty, empty, empty, pOne, empty],
            [empty, empty, pOne, empty, empty],
            [empty, pOne, empty, empty, empty],
            [empty, empty, empty, empty, empty]
        ];

        notEnoughTiles = [
            [empty, empty, empty, empty, empty],
            [empty, empty, empty, pOne, empty],
            [empty, empty, pOne, empty, empty],
            [empty, empty, empty, empty, empty],
            [empty, empty, empty, empty, empty]
        ];
    });

    describe('move at the beginning of a "row"', () => {
        it('should return true, because there is a correct number of tiles', () => {
            runIsWinningMoveTest({ x: 4, y: 0 }, correctTiles, true);
        });

        it('should return false, because there is too many tiles in a row', () => {
            runIsWinningMoveTest({ x: 4, y: 0 }, tooManyTiles, false);
        });
    });

    describe('move in the middle of a "row"', () => {
        it('should return true, because there is a correct number of tiles', () => {
            runIsWinningMoveTest({ x: 3, y: 1 }, correctTiles, true);
        });

        it('should return false, because there is too many tiles in a row', () => {
            runIsWinningMoveTest({ x: 3, y: 1 }, tooManyTiles, false);
        });

        it('should return false, because there is not enough tiles in a row', () => {
            runIsWinningMoveTest({ x: 3, y: 1 }, notEnoughTiles, false);
        });
    });

    describe('move at the end of a "row"', () => {
        it('should return true, because there is a correct number of tiles', () => {
            runIsWinningMoveTest({ x: 2, y: 2 }, correctTiles, true);
        });

        it('should return false, because there is too many tiles in a row', () => {
            runIsWinningMoveTest({ x: 2, y: 2 }, tooManyTiles, false);
        });
    });
});

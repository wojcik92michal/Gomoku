import * as GomokuValidation from './GomokuValidation.utils';
import { IGameSettings, TileValue, Player } from '../Gomoku.definitions';
import { IHistoryItem } from '../History/History.definition';
import { ITilePosition } from '../Board/Tile/Tile.definition';

const mockGameSettings: IGameSettings = {
    boardHeight: 5,
    boardWidth: 5,
    tilesInRowToWin: 3
};

const historyItemsAmount = 5;

function generateMockHistoryItems(
    howMany: number,
    activeItemIndex: number
): IHistoryItem[] {
    return Array(howMany)
        .fill(null)
        .map((_, index) => {
            const historyItem: IHistoryItem = {
                id: index,
                tiles: [],
                active: activeItemIndex === index,
                moveByPlayer: Player.playerOne
            };

            return historyItem;
        });
}

describe('isUserMoveChoiceValid', () => {
    it('should return true for empty tile value', () => {
        expect(
            GomokuValidation.isUserMoveChoiceValid(TileValue.empty)
        ).toBeTruthy();
    });

    it('should return false for first player tile value', () => {
        expect(
            GomokuValidation.isUserMoveChoiceValid(TileValue.playerOne)
        ).toBeFalsy();
    });

    it('should return false for second player tile value', () => {
        expect(
            GomokuValidation.isUserMoveChoiceValid(TileValue.playerTwo)
        ).toBeFalsy();
    });
});

describe('canMoveBeMakeWithActiveHistory', () => {
    it('should return true, because every history item is not active', () => {
        const historyItems = generateMockHistoryItems(historyItemsAmount, -1);
        expect(
            GomokuValidation.canMoveBeMakeWithActiveHistory(historyItems)
        ).toBeTruthy();
    });

    it('should return true, because the last history item is active', () => {
        const historyItems = generateMockHistoryItems(
            historyItemsAmount,
            historyItemsAmount - 1
        );
        expect(
            GomokuValidation.canMoveBeMakeWithActiveHistory(historyItems)
        ).toBeTruthy();
    });

    it('should return true, because other history item than the last one is active', () => {
        const historyItems = generateMockHistoryItems(historyItemsAmount, 0);
        expect(
            GomokuValidation.canMoveBeMakeWithActiveHistory(historyItems)
        ).toBeFalsy();
    });
});

describe('generatePositionsForValidation', () => {
    it('should generate array with four elements', () => {
        const position: ITilePosition = { x: 1, y: 1 };
        const generatedPositions = GomokuValidation.generatePositionsForValidation(
            position,
            mockGameSettings
        );

        expect(generatedPositions.length).toEqual(4);
    });

    it('should generate validation positions for left-to-right direction', () => {
        const position = { x: 2, y: 2 };
        const generatedPositions = GomokuValidation.generatePositionsForValidation(
            position,
            mockGameSettings
        );
        const expectedPositions: ITilePosition[] = [
            { x: position.x - 3, y: position.y },
            { x: position.x - 2, y: position.y },
            { x: position.x - 1, y: position.y },
            position,
            { x: position.x + 1, y: position.y },
            { x: position.x + 2, y: position.y },
            { x: position.x + 3, y: position.y }
        ];

        expect(generatedPositions[0]).toEqual(expectedPositions);
    });

    it('should generate validation positions for top-to-bottom direction', () => {
        const position = { x: 1, y: 1 };
        const generatedPositions = GomokuValidation.generatePositionsForValidation(
            position,
            mockGameSettings
        );
        const expectedPositions: ITilePosition[] = [
            { x: position.x, y: position.y - 3 },
            { x: position.x, y: position.y - 2 },
            { x: position.x, y: position.y - 1 },
            position,
            { x: position.x, y: position.y + 1 },
            { x: position.x, y: position.y + 2 },
            { x: position.x, y: position.y + 3 }
        ];

        expect(generatedPositions[1]).toEqual(expectedPositions);
    });

    it('should generate validation positions for leftTop-to-bottomRight direction', () => {
        const position = { x: 0, y: 0 };
        const generatedPositions = GomokuValidation.generatePositionsForValidation(
            position,
            mockGameSettings
        );
        const expectedPositions: ITilePosition[] = [
            { x: position.x - 3, y: position.y - 3 },
            { x: position.x - 2, y: position.y - 2 },
            { x: position.x - 1, y: position.y - 1 },
            position,
            { x: position.x + 1, y: position.y + 1 },
            { x: position.x + 2, y: position.y + 2 },
            { x: position.x + 3, y: position.y + 3 }
        ];

        expect(generatedPositions[2]).toEqual(expectedPositions);
    });

    it('should generate validation positions for rightTop-to-bottomLeft direction', () => {
        const position = { x: 0, y: 0 };
        const generatedPositions = GomokuValidation.generatePositionsForValidation(
            position,
            mockGameSettings
        );
        const expectedPositions: ITilePosition[] = [
            { x: position.x + 3, y: position.y - 3 },
            { x: position.x + 2, y: position.y - 2 },
            { x: position.x + 1, y: position.y - 1 },
            position,
            { x: position.x - 1, y: position.y + 1 },
            { x: position.x - 2, y: position.y + 2 },
            { x: position.x - 3, y: position.y + 3 }
        ];

        expect(generatedPositions[3]).toEqual(expectedPositions);
    });
});

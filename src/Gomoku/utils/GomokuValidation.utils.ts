import { ITilePosition } from '../Board/Tile/Tile.definition';
import { TileValue, IGameSettings } from '../Gomoku.definitions';
import { IHistoryItem } from '../History/History.definition';

type ModifierCallback = (index: number) => ITilePosition;

export function isWinningMove(
    tiles: number[][],
    movePosition: ITilePosition,
    expectedValue: TileValue,
    gameSettings: IGameSettings
): boolean {
    const winningPositions = generatePositionsForValidation(
        movePosition,
        gameSettings
    );

    return winningPositions.some(winningPosition => {
        return isWinningRow(
            tiles,
            winningPosition,
            expectedValue,
            gameSettings
        );
    });
}

export function isUserMoveChoiceValid(tile: number) {
    return tile === TileValue.empty;
}

export function canMoveBeMakeWithActiveHistory(
    historyItems: IHistoryItem[]
): boolean {
    return (
        historyItems.filter((item, index) => {
            return item.active && index !== historyItems.length - 1;
        }).length === 0
    );
}

export function generatePositionsForValidation(
    movePosition: ITilePosition,
    gameSettings: IGameSettings
): [ITilePosition[], ITilePosition[], ITilePosition[], ITilePosition[]] {
    const { x, y } = movePosition;

    return [
        // left to right
        getValidationPositions(
            movePosition,
            i => ({
                x: x - i,
                y
            }),
            i => ({
                x: x + i,
                y
            }),
            gameSettings.tilesInRowToWin
        ),

        // top to bottom
        getValidationPositions(
            movePosition,
            i => ({
                x,
                y: y - i
            }),
            i => ({
                x,
                y: y + i
            }),
            gameSettings.tilesInRowToWin
        ),

        // left top to bottom right
        getValidationPositions(
            movePosition,
            i => ({
                x: x - i,
                y: y - i
            }),
            i => ({
                x: x + i,
                y: y + i
            }),
            gameSettings.tilesInRowToWin
        ),

        // right top to bottom left
        getValidationPositions(
            movePosition,
            i => ({
                x: x + i,
                y: y - i
            }),
            i => ({
                x: x - i,
                y: y + i
            }),
            gameSettings.tilesInRowToWin
        )
    ];
}

function getValidationPositions(
    movePosition: ITilePosition,
    leftPositionsModifier: ModifierCallback,
    rightPositionsModifier: ModifierCallback,
    winCondition: number
): ITilePosition[] {
    const leftFromCenterPositions = [];
    const rightFromCenterPositions = [];
    for (let i = 0; i < winCondition; i++) {
        leftFromCenterPositions.push(leftPositionsModifier(i + 1));
        rightFromCenterPositions.push(rightPositionsModifier(i + 1));
    }

    return [
        ...leftFromCenterPositions.reverse(),
        movePosition,
        ...rightFromCenterPositions
    ];
}

function isWinningRow(
    tiles: number[][],
    positionsRow: ITilePosition[],
    expectedValue: TileValue,
    gameSettings: IGameSettings
): boolean {
    let inRowWinning = 0;
    for (const position of positionsRow) {
        const { x: x1, y: y1 } = position;
        const isWinningPosition =
            isPositionInTheBoard(
                position,
                gameSettings.boardHeight,
                gameSettings.boardWidth
            ) && tiles[y1][x1] === expectedValue;

        if (isWinningPosition) {
            inRowWinning++;
        } else {
            if (inRowWinning < gameSettings.tilesInRowToWin) {
                inRowWinning = 0;
            } else {
                break;
            }
        }
    }

    return inRowWinning === gameSettings.tilesInRowToWin;
}

function isPositionInTheBoard(
    { x, y }: ITilePosition,
    boardHeight: number,
    boardWidth: number
): boolean {
    return x >= 0 && x < boardHeight && y >= 0 && y < boardWidth;
}

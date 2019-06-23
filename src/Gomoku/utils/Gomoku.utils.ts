import { Player, TileValue, GameMark } from '../Gomoku.definitions';
import { ITilePosition } from '../Board/Tile/Tile.definition';

export function getTilesWithMoveMarked(
    tiles: number[][],
    currentPlayer: Player,
    position: ITilePosition
): number[][] {
    const { x, y } = position;
    const newTiles = cloneTilesArray(tiles);
    newTiles[y][x] = mapPlayerToTileValue(currentPlayer);

    return newTiles;
}

export function getNextPlayer(currentPlayer: Player): Player {
    return currentPlayer === Player.playerOne
        ? Player.playerTwo
        : Player.playerOne;
}

export function generateInitialTiles(height: number, width: number) {
    const rows: number[][] = [];
    for (let i = 0; i < height; i++) {
        const row: number[] = [];
        for (let j = 0; j < width; j++) {
            row.push(TileValue.empty);
        }
        rows.push(row);
    }

    return rows;
}

export function mapPlayerToCharacter(player: Player): GameMark {
    return player === Player.playerOne
        ? GameMark.playerOneMark
        : GameMark.playerTwoMark;
}

export function mapTileValueToCharacter(tileValue: TileValue): string {
    switch (tileValue) {
        case TileValue.playerOne:
            return GameMark.playerOneMark;

        case TileValue.playerTwo:
            return GameMark.playerTwoMark;

        default:
            return '';
    }
}

export function mapPlayerToTileValue(currentPlayer: Player): TileValue {
    return currentPlayer === Player.playerOne
        ? TileValue.playerOne
        : TileValue.playerTwo;
}

function cloneTilesArray(tiles: number[][]): number[][] {
    return tiles.map(tilesLevel => tilesLevel.slice());
}

import * as GomokuUtils from './Gomoku.utils';
import { TileValue, Player, GameMark } from '../Gomoku.definitions';
import { ITilePosition } from '../Board/Tile/Tile.definition';

describe('getTilesWithMoveMarked', () => {
    it('should mark move marked', () => {
        const tiles = [
            [TileValue.empty, TileValue.empty],
            [TileValue.empty, TileValue.empty]
        ];

        const position: ITilePosition = { x: 1, y: 1 };
        const player = Player.playerOne;

        const expectedTiles = [
            [TileValue.empty, TileValue.empty],
            [TileValue.empty, TileValue.playerOne]
        ];

        const markedTiles = GomokuUtils.getTilesWithMoveMarked(
            tiles,
            player,
            position
        );

        expect(markedTiles).toEqual(expectedTiles);
    });
});

describe('getNextPlayer', () => {
    it('should return player one', () => {
        expect(GomokuUtils.getNextPlayer(Player.playerTwo)).toEqual(
            Player.playerOne
        );
    });
    it('should return player two', () => {
        expect(GomokuUtils.getNextPlayer(Player.playerOne)).toEqual(
            Player.playerTwo
        );
    });
});

describe('generateInitialTiles', () => {
    it('should generate initial tiles', () => {
        const tiles = [
            [TileValue.empty, TileValue.empty],
            [TileValue.empty, TileValue.empty],
            [TileValue.empty, TileValue.empty]
        ];

        const generatedTiles = GomokuUtils.generateInitialTiles(3, 2);

        expect(tiles).toEqual(generatedTiles);
    });
});

describe('mapPlayerToCharacter', () => {
    it('should map player one to player one mark', () => {
        expect(GomokuUtils.mapPlayerToCharacter(Player.playerOne)).toEqual(
            GameMark.playerOneMark
        );
    });

    it('should map player two to player two mark', () => {
        expect(GomokuUtils.mapPlayerToCharacter(Player.playerTwo)).toEqual(
            GameMark.playerTwoMark
        );
    });
});

describe('mapTileValueToCharacter', () => {
    it('should tile belonging player one to player one mark ', () => {
        expect(
            GomokuUtils.mapTileValueToCharacter(TileValue.playerOne)
        ).toEqual(GameMark.playerOneMark);
    });

    it('should tile belonging player two to player two mark ', () => {
        expect(
            GomokuUtils.mapTileValueToCharacter(TileValue.playerTwo)
        ).toEqual(GameMark.playerTwoMark);
    });

    it('should return default value (empty string)', () => {
        expect(GomokuUtils.mapTileValueToCharacter(TileValue.empty)).toEqual(
            ''
        );
    });
});
describe('mapPlayerToTileValue', () => {
    it('should map player one to player one tile value', () => {
        expect(GomokuUtils.mapPlayerToTileValue(Player.playerOne)).toEqual(
            TileValue.playerOne
        );
    });

    it('should map player two to player two tile value', () => {
        expect(GomokuUtils.mapPlayerToTileValue(Player.playerTwo)).toEqual(
            TileValue.playerTwo
        );
    });
});

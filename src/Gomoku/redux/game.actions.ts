import { ITilePosition } from '../Board/Tile/Tile.definition';
import { TileValue } from '../Gomoku.definitions';
import { IHistoryItem } from '../History/History.definition';

export const NEXT_MOVE = 'NEXT_MOVE';
export const GAME_WON = 'GAME_WON';
export const RESET_GAME = 'RESET_GAME';
export const UPDATE_STATE_FROM_HISTORY_ITEM = 'UPDATE_STATE_FROM_HISTORY_ITEM';

interface NextMove {
    type: typeof NEXT_MOVE;
    payload: {
        position: ITilePosition;
        tileValue: TileValue;
    };
}

interface ResetGame {
    type: typeof RESET_GAME;
}

interface WonGame {
    type: typeof GAME_WON;
}

interface UpdateStateFromHistoryItem {
    type: typeof UPDATE_STATE_FROM_HISTORY_ITEM;
    payload: {
        historyItem: IHistoryItem;
    };
}

export type GameActions =
    | NextMove
    | ResetGame
    | WonGame
    | UpdateStateFromHistoryItem;

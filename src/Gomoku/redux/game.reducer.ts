import { Player } from '../Gomoku.definitions';
import { IHistoryItem } from '../History/History.definition';
import { generateInitialTiles, getNextPlayer } from '../utils/Gomoku.utils';
import { AnyAction } from 'redux';
import {
    NEXT_MOVE,
    GAME_WON,
    RESET_GAME,
    UPDATE_STATE_FROM_HISTORY_ITEM
} from './game.actions';
import { GameSettings } from '../Gomoku.settings';

export interface IGameState {
    tiles: number[][];
    currentPlayer: Player;
    gameWonByPlayer?: Player;
    history: IHistoryItem[];
}

const initialState: IGameState = {
    tiles: generateInitialTiles(
        GameSettings.boardHeight,
        GameSettings.boardWidth
    ),
    currentPlayer: Player.playerOne,
    history: []
};

export function gameReducer(
    state = initialState,
    action: AnyAction
): IGameState {
    switch (action.type) {
        case NEXT_MOVE: {
            const { tiles } = action.payload;
            return {
                ...state,
                tiles,
                currentPlayer: getNextPlayer(state.currentPlayer)
            };
        }

        case GAME_WON: {
            return {
                ...state,
                gameWonByPlayer: getNextPlayer(state.currentPlayer)
            };
        }

        case RESET_GAME: {
            return {
                currentPlayer: Player.playerOne,
                gameWonByPlayer: undefined,
                tiles: generateInitialTiles(
                    GameSettings.boardHeight,
                    GameSettings.boardWidth
                ),
                history: []
            };
        }

        case UPDATE_STATE_FROM_HISTORY_ITEM: {
            const { moveByPlayer, tiles } = action.payload.historyItem;
            return {
                ...state,
                tiles,
                currentPlayer: moveByPlayer
            };
        }

        default:
            return state;
    }
}

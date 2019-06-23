import {
    NEXT_MOVE,
    GAME_WON,
    RESET_GAME,
    UPDATE_STATE_FROM_HISTORY_ITEM
} from './game.actions';
import { IHistoryItem } from '../History/History.definition';
import { ITilePosition } from '../Board/Tile/Tile.definition';
import { TileValue, IGameSettings } from '../Gomoku.definitions';
import { IGameState } from './game.reducer';
import { IHistoryState } from '../History/redux/history.reducer';
import {
    mapPlayerToTileValue,
    getTilesWithMoveMarked,
    getNextPlayer
} from '../utils/Gomoku.utils';
import {
    isUserMoveChoiceValid,
    canMoveBeMakeWithActiveHistory,
    isWinningMove
} from '../utils/GomokuValidation.utils';
import {
    unactivateHistoryItems,
    addHistoryItem
} from '../History/redux/history.creators';
import { IAppState } from '../../App.store';
import { Dispatch } from 'react';
import { GameSettings } from '../Gomoku.settings';

// TODO types
function nextMove(tiles: number[][]) {
    return {
        type: NEXT_MOVE,
        payload: {
            tiles
        }
    };
}

function gameWon() {
    return {
        type: GAME_WON
    };
}

export function resetGame() {
    return {
        type: RESET_GAME
    };
}

export function updateStateFromHistoryItem(historyItem: IHistoryItem) {
    return {
        type: UPDATE_STATE_FROM_HISTORY_ITEM,
        payload: {
            historyItem
        }
    };
}

// TODO add test for this
export function handleNextMove(
    position: ITilePosition,
    clickedTileValue: TileValue
) {
    // TODO dispatch type
    return (dispatch: Dispatch<any>, getState: () => IAppState) => {
        const gameState: IGameState = getState().game;
        const historyState: IHistoryState = getState().history;

        const { gameWonByPlayer, currentPlayer, tiles } = gameState;
        const expectedTileValue = mapPlayerToTileValue(currentPlayer);

        if (gameWonByPlayer) {
            return;
        }

        if (
            isUserMoveChoiceValid(clickedTileValue) &&
            canMoveBeMakeWithActiveHistory(historyState.historyItems)
        ) {
            const newTiles = getTilesWithMoveMarked(
                tiles,
                currentPlayer,
                position
            );
            dispatch(nextMove(newTiles));
            dispatch(unactivateHistoryItems());
            dispatch(addHistoryItem(newTiles, getNextPlayer(currentPlayer)));

            if (
                isWinningMove(
                    newTiles,
                    position,
                    expectedTileValue,
                    GameSettings
                )
            ) {
                dispatch(gameWon());
            }
        }
    };
}

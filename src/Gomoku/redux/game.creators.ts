import { Dispatch } from 'react';
import { IAppState } from '../../App.store';
import { ITilePosition } from '../Board/Tile/Tile.definition';
import { TileValue } from '../Gomoku.definitions';
import { GameSettings } from '../Gomoku.settings';
import { IHistoryItem } from '../History/History.definition';
import {
    addHistoryItem,
    unactivateHistoryItems
} from '../History/redux/history.creators';
import { IHistoryState } from '../History/redux/history.reducer';
import {
    getNextPlayer,
    getTilesWithMoveMarked,
    mapPlayerToTileValue
} from '../utils/Gomoku.utils';
import {
    canMoveBeMakeWithActiveHistory,
    isUserMoveChoiceValid,
    isWinningMove
} from '../utils/GomokuValidation.utils';
import {
    GAME_WON,
    NEXT_MOVE,
    RESET_GAME,
    UPDATE_STATE_FROM_HISTORY_ITEM
} from './game.actions';
import { IGameState } from './game.reducer';

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

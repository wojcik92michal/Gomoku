import {
    ADD_HISTORY_ITEM,
    UNACTIVATE_HISTORY_ITEMS,
    MARK_HISTORY_ITEM_AS_ACTIVE,
    CLEAR_HISTORY_ITEMS
} from './history.actions';
import { Player } from '../../Gomoku.definitions';

// TODO return types
export function addHistoryItem(tiles: number[][], player: Player) {
    return {
        type: ADD_HISTORY_ITEM,
        payload: {
            tiles,
            player
        }
    };
}

export function unactivateHistoryItems() {
    return {
        type: UNACTIVATE_HISTORY_ITEMS
    };
}

export function markHistoryItemAsActive(id: number) {
    return {
        type: MARK_HISTORY_ITEM_AS_ACTIVE,
        payload: {
            id
        }
    };
}

export function clearHistoryItems() {
    return {
        type: CLEAR_HISTORY_ITEMS
    };
}

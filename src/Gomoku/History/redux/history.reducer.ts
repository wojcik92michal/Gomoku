import { Player } from '../../Gomoku.definitions';
import { IHistoryItem } from '../History.definition';
import {
    UNACTIVATE_HISTORY_ITEMS,
    ADD_HISTORY_ITEM,
    MARK_HISTORY_ITEM_AS_ACTIVE,
    CLEAR_HISTORY_ITEMS
} from './history.actions';
import { AnyAction } from 'redux';

export interface IHistoryState {
    historyItems: IHistoryItem[];
}

const initialHistoryState: IHistoryState = {
    historyItems: []
};

export function historyReducer(
    state = initialHistoryState,
    action: AnyAction
): IHistoryState {
    switch (action.type) {
        case UNACTIVATE_HISTORY_ITEMS:
            return {
                historyItems: state.historyItems.map(item => ({
                    ...item,
                    active: false
                }))
            };

        case ADD_HISTORY_ITEM: {
            const historyItems = [...state.historyItems];
            const id =
                historyItems.length === 0
                    ? 1
                    : historyItems[historyItems.length - 1].id + 1;
            const newHistoryItem: IHistoryItem = {
                id,
                active: false,
                moveByPlayer: action.payload.player,
                tiles: action.payload.tiles
            };

            return {
                ...state,
                historyItems: [...state.historyItems, newHistoryItem]
            };
        }

        case MARK_HISTORY_ITEM_AS_ACTIVE: {
            const historyItems = state.historyItems.map((item, index) => ({
                ...item,
                active: item.id === action.payload.id
            }));

            return {
                ...state,
                historyItems
            };
        }

        case CLEAR_HISTORY_ITEMS:
            return {
                ...state,
                historyItems: []
            };

        default:
            return state;
    }
}

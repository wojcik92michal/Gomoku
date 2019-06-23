export const ADD_HISTORY_ITEM = 'ADD_HISTORY_ITEM';
export const UNACTIVATE_HISTORY_ITEMS = 'UNACTIVATE_HISTORY_ITEMS';
export const MARK_HISTORY_ITEM_AS_ACTIVE = 'MARK_HISTORY_ITEM_AS_ACTIVE';
export const CLEAR_HISTORY_ITEMS = 'CLEAR_HISTORY_ITEMS';

interface AddHistoryItem {
    type: typeof ADD_HISTORY_ITEM;
    payload: {
        tiles: number[][];
    };
}

interface UnactivateHistoryItems {
    type: typeof UNACTIVATE_HISTORY_ITEMS;
}

interface MarkHistoryItemAsActive {
    type: typeof MARK_HISTORY_ITEM_AS_ACTIVE;
}

interface ClearHistoryItems {
    type: typeof CLEAR_HISTORY_ITEMS;
}

export type HistoryActions =
    | AddHistoryItem
    | UnactivateHistoryItems
    | MarkHistoryItemAsActive
    | ClearHistoryItems;

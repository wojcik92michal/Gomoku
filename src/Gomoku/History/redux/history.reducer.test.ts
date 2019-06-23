import { historyReducer, IHistoryState } from './history.reducer';
import { Player } from '../../Gomoku.definitions';
import { IHistoryItem } from '../History.definition';
import {
    unactivateHistoryItems,
    addHistoryItem,
    markHistoryItemAsActive,
    clearHistoryItems
} from './history.creators';

const mockHistoryState: IHistoryState = {
    historyItems: [
        {
            id: 1,
            active: false,
            moveByPlayer: Player.playerOne,
            tiles: []
        },
        {
            id: 2,
            active: false,
            moveByPlayer: Player.playerTwo,
            tiles: []
        },
        {
            id: 3,
            active: true,
            moveByPlayer: Player.playerOne,
            tiles: []
        }
    ]
};

describe('historyReducer', () => {
    it('should return default state', () => {
        const newState = historyReducer(undefined, { type: 'FAKE_TYPE' });
        const expectedState: IHistoryState = {
            historyItems: []
        };
        expect(newState).toEqual(expectedState);
    });

    it('should unactivate all history items', () => {
        const isAnyHistoryItemActive = (historyItems: IHistoryItem[]) =>
            historyItems.some(item => item.active);

        expect(
            isAnyHistoryItemActive(mockHistoryState.historyItems)
        ).toBeTruthy();

        const newState = historyReducer(
            mockHistoryState,
            unactivateHistoryItems()
        );

        expect(isAnyHistoryItemActive(newState.historyItems)).toBeFalsy();
    });

    it('should add new history item', () => {
        const newHistoryItem: IHistoryItem = {
            id: mockHistoryState.historyItems.length + 1,
            active: false,
            moveByPlayer: Player.playerTwo,
            tiles: []
        };

        const expectedState: IHistoryState = {
            historyItems: [...mockHistoryState.historyItems, newHistoryItem]
        };

        const newState = historyReducer(
            mockHistoryState,
            addHistoryItem(newHistoryItem.tiles, newHistoryItem.moveByPlayer)
        );

        expect(newState).toEqual(expectedState);
    });

    it('should mark new history item as active', () => {
        const itemIndex = 0;

        expect(mockHistoryState.historyItems[itemIndex].active).toBeFalsy();

        const newState = historyReducer(
            mockHistoryState,
            markHistoryItemAsActive(mockHistoryState.historyItems[itemIndex].id)
        );

        expect(newState.historyItems[itemIndex].active).toBeTruthy();
    });

    it('should clear all history items', () => {
        expect(mockHistoryState.historyItems.length).toBeGreaterThan(0);

        const newState = historyReducer(mockHistoryState, clearHistoryItems());

        expect(newState.historyItems.length).toEqual(0);
    });
});

import React from 'react';
import { shallow } from 'enzyme';
import { HistoryContainer } from './History';
import { IHistoryItem } from './History.definition';
import { Player } from '../Gomoku.definitions';

function setupComponent(historyItemsAmount: number) {
    const historyItems = Array(historyItemsAmount)
        .fill(generateFakeHistoryItem)
        .map((item, index) => ({
            ...item,
            id: index + 1
        }));
    const props = { historyItems };
    const component = shallow(<HistoryContainer {...props} />);

    return {
        props,
        component
    };
}

function generateFakeHistoryItem(id: number): IHistoryItem {
    return {
        id,
        active: false,
        moveByPlayer: Player.playerOne,
        tiles: []
    };
}

describe('History', () => {
    it('should render history items ', () => {
        const historyItemsAmount = 3;
        const { component } = setupComponent(historyItemsAmount);

        expect(component.children().length).toEqual(historyItemsAmount);
    });
});

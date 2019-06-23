import React from 'react';
import { shallow } from 'enzyme';
import { HistoryItemContainer } from './HistoryItem';
import { Player } from '../../Gomoku.definitions';
import { IHistoryItem } from '../History.definition';
import styles from './HistoryItem.module.css';

const inactiveHistoryItem: IHistoryItem = {
    active: false,
    moveByPlayer: Player.playerOne,
    tiles: []
};

const activeHistoryItem: IHistoryItem = {
    ...inactiveHistoryItem,
    active: true
};

const historyItemIndex = 1;

function setupComponent(historyItem: IHistoryItem = inactiveHistoryItem) {
    const props = {
        history: historyItem,
        index: historyItemIndex,
        markHistoryItemAsActive: jest.fn(),
        unactivateHistoryItems: jest.fn(),
        updateStateFromHistoryItem: jest.fn()
    };

    const component = shallow(<HistoryItemContainer {...props} />);

    return {
        props,
        component
    };
}

describe('HistoryItem', () => {
    describe('HistoryItem presentation', () => {
        it('should display proper label', () => {
            const { component } = setupComponent();
            const expectedLabel = `Move ${historyItemIndex + 1}`;
            const label = component.find(`.${styles.historyItem}`).text();

            expect(label).toEqual(expectedLabel);
        });

        it('should should set "active" class because history item is marked as "active"', () => {
            const { component } = setupComponent(activeHistoryItem);
            const element = component.find(`.${styles.activeHistoryItem}`);

            expect(element.length).toEqual(1);
        });

        it('should should not set "active" class because history item is marked as "inactive"', () => {
            const { component } = setupComponent(inactiveHistoryItem);
            const element = component.find(`.${styles.activeHistoryItem}`);

            expect(element.length).toEqual(0);
        });
    });

    describe('HistoryItem click', () => {
        it('should call "mark all history items as unactive" action', () => {
            const { component, props } = setupComponent();
            component.find(`.${styles.historyItem}`).simulate('click');

            expect(props.unactivateHistoryItems.mock.calls.length).toBe(1);
        });

        it('should call "mark history item as active" action with proper params', () => {
            const { component, props } = setupComponent();
            component.find(`.${styles.historyItem}`).simulate('click');

            expect(props.markHistoryItemAsActive.mock.calls.length).toBe(1);
            expect(props.markHistoryItemAsActive).toBeCalledWith(props.index);
        });

        it('should call "update history item state" action with proper params', () => {
            const { component, props } = setupComponent();
            component.find(`.${styles.historyItem}`).simulate('click');

            expect(props.updateStateFromHistoryItem.mock.calls.length).toBe(1);
            expect(props.updateStateFromHistoryItem).toBeCalledWith(
                props.history
            );
        });
    });
});

import React from 'react';
import { TileContainer } from './Tile';
import { shallow } from 'enzyme';
import { ITilePosition } from './Tile.definition';
import { TileValue } from '../../Gomoku.definitions';
import { mapTileValueToCharacter } from '../../utils/Gomoku.utils';

function setupTileComponent(tileValue: TileValue) {
    const position: ITilePosition = { x: 1, y: 1 };
    const props = {
        makeNextMove: jest.fn(),
        value: tileValue,
        position: position
    };
    const component = shallow(<TileContainer {...props} />);

    return {
        component,
        props
    };
}

describe('Tile component', () => {
    describe('Tile presentation', () => {
        it('should render empty tile component', () => {
            const { component } = setupTileComponent(TileValue.empty);
            const foundText = component.find('span').text();
            const expectedText = mapTileValueToCharacter(TileValue.empty);

            expect(foundText).toEqual(expectedText);
        });

        it('should render tile component with player one mark', () => {
            const { component } = setupTileComponent(TileValue.playerOne);
            const foundText = component.find('span').text();
            const expectedText = mapTileValueToCharacter(TileValue.playerOne);

            expect(foundText).toEqual(expectedText);
        });

        it('should render tile component with player two mark', () => {
            const { component } = setupTileComponent(TileValue.playerTwo);
            const foundText = component.find('span').text();
            const expectedText = mapTileValueToCharacter(TileValue.playerTwo);

            expect(foundText).toEqual(expectedText);
        });
    });

    describe('Tile click', () => {
        it('should call makeNextMove method after clicking', () => {
            const { component, props } = setupTileComponent(
                TileValue.playerOne
            );

            expect(props.makeNextMove.mock.calls.length).toBe(0);

            component.find('span').simulate('click');

            expect(props.makeNextMove.mock.calls.length).toBe(1);
        });

        it('should call makeNextMove with proper params', () => {
            const { component, props } = setupTileComponent(
                TileValue.playerOne
            );
            component.find('span').simulate('click');

            expect(props.makeNextMove).toBeCalledWith(
                props.position,
                props.value
            );
        });
    });
});

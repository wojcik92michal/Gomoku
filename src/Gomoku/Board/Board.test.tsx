import React from 'react';
import { BoardContainer } from './Board';
import { shallow } from 'enzyme';
import styles from './Board.module.css';

const boardHeight = 2;
const boardWidth = 5;

function setupComponent(tiles: number[][]) {
    const props = {
        tiles
    };
    const component = shallow(<BoardContainer {...props} />);

    return {
        props,
        component
    };
}

function createMockTiles(height: number, width: number) {
    return new Array(height).fill(0).map(() => new Array(width).fill(0));
}

describe('Board', () => {
    it('should generate proper number of rows rows', () => {
        const initialTiles = createMockTiles(boardHeight, boardWidth);

        const { component } = setupComponent(initialTiles);

        expect(component.find(`.${styles.boardRow}`).length).toEqual(
            boardHeight
        );
    });

    it('should generate proper amount of tiles', () => {
        const expectedAmountOfTiles = boardHeight * boardWidth;
        const initialTiles = createMockTiles(boardHeight, boardWidth);

        const { component } = setupComponent(initialTiles);
        const rows = component.find(`.${styles.boardRow}`);
        const tiles = rows.children();

        expect(tiles.length).toEqual(expectedAmountOfTiles);
    });
});

import React from 'react';
import { shallow } from 'enzyme';
import { GomokuContainer } from './Gomoku';
import { Player } from './Gomoku.definitions';
import { mapPlayerToCharacter } from './utils/Gomoku.utils';

function setupComponent(
    currentPlayer: Player = Player.playerOne,
    gameWonByPlayer?: Player
) {
    const props = {
        resetGame: jest.fn(),
        clearHistoryItems: jest.fn(),
        tiles: [],
        currentPlayer,
        gameWonByPlayer
    };

    const component = shallow(<GomokuContainer {...props} />);

    return {
        props,
        component
    };
}

describe('Gomoku', () => {
    describe('Gomoku presentation', () => {
        it('should display proper information who makes next move', () => {
            const currentPlayer = Player.playerOne;
            const playerCharLabel = `(${mapPlayerToCharacter(currentPlayer)})`;
            const { component } = setupComponent(currentPlayer);
            const label = component.find('h1').text();

            expect(label).toContain(playerCharLabel);
            expect(label).toContain(currentPlayer);
        });

        it('should display information label when a player won a game', () => {
            const currentPlayer = Player.playerOne;
            const winningPlayer = Player.playerTwo;
            const { component } = setupComponent(currentPlayer, winningPlayer);
            const label = component.find('h1').text();
            const expectedLabel = `Player ${winningPlayer} won!`;

            expect(label).toEqual(expectedLabel);
        });
    });

    describe('Gomoku reset click', () => {
        it('should dispatch "reset game" action', () => {
            const { component, props } = setupComponent();

            component.find('button').simulate('click');

            expect(props.resetGame.mock.calls.length).toEqual(1);
        });

        it('should dispatch "remove all history items" action', () => {
            const { component, props } = setupComponent();

            component.find('button').simulate('click');

            expect(props.clearHistoryItems.mock.calls.length).toEqual(1);
        });
    });
});

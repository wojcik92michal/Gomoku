import React from 'react';
import { Player } from './Gomoku.definitions';
import { mapPlayerToCharacter } from './utils/Gomoku.utils';
import styles from './Gomoku.module.css';
import Board from './Board/Board';
import History from './History/History';
import { resetGame } from './redux/game.creators';
import { clearHistoryItems } from './History/redux/history.creators';
import { connect } from 'react-redux';
import { IAppState } from '../App.store';

interface IGameProps {
    resetGame: any; // TODO type
    clearHistoryItems: any; // TODO type
    tiles: number[][];
    currentPlayer: Player;
    gameWonByPlayer?: Player;
}

export class GomokuContainer extends React.Component<IGameProps> {
    constructor(props: IGameProps) {
        super(props);

        this.onResetClick = this.onResetClick.bind(this);
    }

    onResetClick(): void {
        this.props.resetGame();
        this.props.clearHistoryItems();
    }

    render() {
        const { currentPlayer, gameWonByPlayer } = this.props;
        const playerChar = mapPlayerToCharacter(currentPlayer);

        let gameInfo = `Next move: player ${currentPlayer} (${playerChar})`;

        if (gameWonByPlayer) {
            gameInfo = `Player ${gameWonByPlayer} won!`;
        }

        return (
            <div>
                <h1>{gameInfo}</h1>
                <div className={styles.contentWrap}>
                    <Board />
                    <History />
                </div>
                <div>
                    <button onClick={this.onResetClick}>Reset game</button>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = {
    resetGame,
    clearHistoryItems
};

const mapStateToProps = (state: IAppState) => {
    const { currentPlayer, gameWonByPlayer, tiles } = state.game;
    return {
        tiles,
        currentPlayer,
        gameWonByPlayer
    };
};

const Gomoku = connect(
    mapStateToProps,
    mapDispatchToProps
)(GomokuContainer);

export default Gomoku;

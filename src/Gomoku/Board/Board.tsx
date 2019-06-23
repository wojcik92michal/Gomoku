import React from 'react';
import styles from './Board.module.css';
import { ITilePosition } from './Tile/Tile.definition';
import Tile from './Tile/Tile';
import { connect } from 'react-redux';
import { TileValue } from '../Gomoku.definitions';
import { IAppState } from '../../App.store';

interface IBoardProps {
    tiles: number[][];
}

export class BoardContainer extends React.Component<IBoardProps> {
    private generateRows(): any {
        const rows = [];
        const { tiles } = this.props;

        for (let i = 0; i < this.props.tiles.length; i++) {
            rows.push(this.generateRow(i, tiles[i]));
        }

        return rows;
    }

    private generateRow(rowNumber: number, tiles: number[]): any {
        const row = [];
        for (let i = 0; i < tiles.length; i++) {
            const position: ITilePosition = {
                x: i,
                y: rowNumber
            };
            row.push(this.generateTile(position, tiles[i]));
        }

        return (
            <div className={styles.boardRow} key={rowNumber}>
                {row}
            </div>
        );
    }

    // TODO return type
    private generateTile(position: ITilePosition, tileValue: TileValue): any {
        const key = `${position.x}_${position.y}`;
        return <Tile key={key} position={position} value={tileValue} />;
    }

    render() {
        const tiles = this.generateRows();

        return <div>{tiles}</div>;
    }
}

const mapStateToProps = (state: IAppState) => {
    return {
        tiles: state.game.tiles
    };
};

const Board = connect(
    mapStateToProps,
    null
)(BoardContainer);

export default Board;

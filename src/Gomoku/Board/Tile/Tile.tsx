import styles from './Tile.module.css';
import { ITilePosition } from './Tile.definition';
import { connect } from 'react-redux';
import React from 'react';
import { TileValue } from '../../Gomoku.definitions';
import { mapTileValueToCharacter } from '../../utils/Gomoku.utils';
import { handleNextMove } from '../../redux/game.creators';

interface ITileProps {
    position: ITilePosition;
    value: TileValue;
    makeNextMove: (
        position: ITilePosition,
        clickedTileValue: TileValue
    ) => void;
}

export class TileContainer extends React.Component<ITileProps> {
    constructor(props: ITileProps) {
        super(props);

        this.handleTileClick = this.handleTileClick.bind(this);
    }

    handleTileClick(): void {
        this.props.makeNextMove(this.props.position, this.props.value);
    }

    render() {
        return (
            <span className={styles.Tile} onClick={this.handleTileClick}>
                {mapTileValueToCharacter(this.props.value)}
            </span>
        );
    }
}

// TODO dispatch type
const mapDispatchToProps = (dispatch: any) => ({
    makeNextMove: (position: ITilePosition, clickedTileValue: TileValue) =>
        dispatch(handleNextMove(position, clickedTileValue))
});

const Tile = connect(
    null,
    mapDispatchToProps
)(TileContainer);

export default Tile;

import styles from './HistoryItem.module.css';
import React from 'react';
import { IHistoryItem } from '../History.definition';
import {
    markHistoryItemAsActive,
    unactivateHistoryItems
} from '../redux/history.creators';
import { updateStateFromHistoryItem } from '../../redux/game.creators';
import { connect } from 'react-redux';

interface IHistoryItemProps {
    history: IHistoryItem;
    index: number;
    markHistoryItemAsActive: any; // TODO type
    unactivateHistoryItems: any; // TODO type
    updateStateFromHistoryItem: any; // TODO type
}

export class HistoryItemContainer extends React.Component<IHistoryItemProps> {
    constructor(props: IHistoryItemProps) {
        super(props);

        this.onHistoryItemClick = this.onHistoryItemClick.bind(this);
    }

    onHistoryItemClick(): void {
        this.props.updateStateFromHistoryItem(this.props.history);
        this.props.unactivateHistoryItems();
        this.props.markHistoryItemAsActive(this.props.history.id);
    }

    render() {
        const {
            history: { active }
        } = this.props;
        const isActiveClass = active ? styles.activeHistoryItem : '';
        const classes = `${styles.historyItem} ${isActiveClass}`;

        return (
            <div onClick={this.onHistoryItemClick} className={classes}>
                Move {this.props.index + 1}
            </div>
        );
    }
}

const mapDispatchToProps = {
    markHistoryItemAsActive,
    unactivateHistoryItems,
    updateStateFromHistoryItem
};

const HistoryItem = connect(
    null,
    mapDispatchToProps
)(HistoryItemContainer);

export default HistoryItem;

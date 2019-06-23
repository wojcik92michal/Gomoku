import React from 'react';
import { IHistoryItem } from './History.definition';
import { connect } from 'react-redux';
import { IAppState } from '../../App.store';
import HistoryItem from './HistoryItem/HistoryItem';

interface IHistoryProps {
    historyItems: IHistoryItem[];
}

export class HistoryContainer extends React.Component<IHistoryProps> {
    render() {
        const historyItems = this.props.historyItems.map(
            (historyItem, index) => {
                return (
                    <HistoryItem
                        key={historyItem.id}
                        history={historyItem}
                        index={index}
                    />
                );
            }
        );

        return <div>{historyItems}</div>;
    }
}

const mapStateToProps = (state: IAppState) => {
    const { historyItems } = state.history;
    return {
        historyItems
    };
};

const History = connect(
    mapStateToProps,
    null
)(HistoryContainer);

export default History;

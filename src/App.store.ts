import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { gameReducer, IGameState } from './Gomoku/redux/game.reducer';
import {
    historyReducer,
    IHistoryState
} from './Gomoku/History/redux/history.reducer';

export interface IAppState {
    history: IHistoryState;
    game: IGameState;
}

const gomokuGame = combineReducers<IAppState>({
    game: gameReducer,
    history: historyReducer
});

const store = createStore(gomokuGame, applyMiddleware(thunk));

export default store;

import { Player } from '../Gomoku.definitions';

export interface IHistoryItem {
    id: number;
    moveByPlayer: Player;
    tiles: number[][];
    active: boolean;
}

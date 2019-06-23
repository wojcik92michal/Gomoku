import React from 'react';
import styles from './App.module.css';
import Game from './Gomoku/Gomoku';
import ErrorHandler from './ErrorHandler/ErrorHandler';
import { GameSettings } from './Gomoku/Gomoku.settings';

const App: React.FC = () => {
    const requiredTilesCount = GameSettings.tilesInRowToWin;
    return (
        <ErrorHandler>
            <div className={styles.appContainer}>
                <header>
                    <h2>Gomoku</h2>
                </header>
                <Game />
                <footer>
                    <p>
                        To win you need to have {requiredTilesCount} selections
                        in a row
                    </p>
                </footer>
            </div>
        </ErrorHandler>
    );
};

export default App;

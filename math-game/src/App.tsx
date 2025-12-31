import React, { useState, useEffect } from 'react';
import GameModeSelector, { GameMode } from './components/GameModeSelector';
import Game from './components/Game';
import { getProgress, Progress } from './utils/progress';
import './styles/App.css';
import './styles/animations.css';

const App: React.FC = () => {
    const [currentMode, setCurrentMode] = useState<GameMode | null>(null);
    const [progress, setProgress] = useState<Progress>(getProgress());

    const handleSelectMode = (mode: GameMode) => {
        setCurrentMode(mode);
    };

    const handleBackToMenu = () => {
        setCurrentMode(null);
        // Refresh progress when returning to menu
        setProgress(getProgress());
    };

    return (
        <div className="App">
            {currentMode ? (
                <Game mode={currentMode} onBack={handleBackToMenu} />
            ) : (
                <div className="game-container">
                    <GameModeSelector 
                        onSelectMode={handleSelectMode}
                        progress={progress}
                    />
                </div>
            )}
        </div>
    );
};

export default App;

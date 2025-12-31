import React from 'react';

export type GameMode = 'counting' | 'addition' | 'subtraction' | 'shapes' | 'patterns';

interface GameModeSelectorProps {
    onSelectMode: (mode: GameMode) => void;
    progress?: {
        counting: number;
        addition: number;
        subtraction: number;
        shapes: number;
        patterns: number;
    };
}

const GameModeSelector: React.FC<GameModeSelectorProps> = ({ onSelectMode, progress }) => {
    const gameModes: { mode: GameMode; label: string; emoji: string; color: string }[] = [
        { mode: 'counting', label: 'Counting', emoji: '🔢', color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
        { mode: 'addition', label: 'Addition', emoji: '➕', color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
        { mode: 'subtraction', label: 'Subtraction', emoji: '➖', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
        { mode: 'shapes', label: 'Shapes', emoji: '🔷', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' },
        { mode: 'patterns', label: 'Patterns', emoji: '🎨', color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
    ];

    const getStars = (score: number = 0) => {
        const stars = Math.floor(score / 5); // 5 correct answers = 1 star
        return Math.min(stars, 5); // Max 5 stars
    };

    return (
        <div className="game-mode-selector">
            <h1>Math Blaster! 🚀</h1>
            <h2>Choose a Game Mode</h2>
            <div className="game-mode-grid">
                {gameModes.map(({ mode, label, emoji, color }) => {
                    const stars = progress ? getStars(progress[mode]) : 0;
                    return (
                        <button
                            key={mode}
                            className="game-mode-button"
                            style={{ background: color }}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onSelectMode(mode);
                            }}
                            type="button"
                        >
                            <span style={{ fontSize: '40px', lineHeight: '1', display: 'block' }}>{emoji}</span>
                            <span style={{ lineHeight: '1.2', display: 'block', fontSize: '20px' }}>{label}</span>
                            {progress && (
                                <div className="progress-container" style={{ width: '100%', maxWidth: '100%' }}>
                                    {[1, 2, 3, 4, 5].map((starNum) => (
                                        <span
                                            key={starNum}
                                            className={`star ${starNum <= stars ? '' : 'empty'}`}
                                            style={{ fontSize: '14px' }}
                                        >
                                            ⭐
                                        </span>
                                    ))}
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default GameModeSelector;


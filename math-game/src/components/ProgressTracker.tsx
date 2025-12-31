import React from 'react';
import { Progress, getStarsForMode } from '../utils/progress';

interface ProgressTrackerProps {
    progress: Progress;
    currentMode?: keyof Progress;
    currentScore?: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ 
    progress, 
    currentMode,
    currentScore = 0 
}) => {
    const modes: Array<{ key: keyof Progress; label: string; emoji: string }> = [
        { key: 'counting', label: 'Counting', emoji: '🔢' },
        { key: 'addition', label: 'Addition', emoji: '➕' },
        { key: 'subtraction', label: 'Subtraction', emoji: '➖' },
        { key: 'shapes', label: 'Shapes', emoji: '🔷' },
        { key: 'patterns', label: 'Patterns', emoji: '🎨' },
    ];

    const renderStars = (mode: keyof Progress, score: number) => {
        // Calculate stars based on score: 1 star per 5 correct answers, max 5 stars
        const stars = Math.min(5, Math.floor(score / 5));
        return (
            <div style={{ display: 'flex', gap: '5px' }}>
                {[1, 2, 3, 4, 5].map((starNum) => (
                    <span
                        key={starNum}
                        className={`star ${starNum <= stars ? '' : 'empty'}`}
                        style={{ fontSize: '24px' }}
                    >
                        ⭐
                    </span>
                ))}
            </div>
        );
    };

    return (
        <div style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.9)', 
            borderRadius: '20px', 
            padding: '20px',
            margin: '20px 0',
            width: '100%',
            maxWidth: '600px',
        }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '15px', textAlign: 'center' }}>
                Your Progress 📊
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {modes.map(({ key, label, emoji }) => {
                    const bestScore = progress[key] as number || 0;
                    const isCurrent = currentMode === key;
                    // Use current score if this is the active mode, otherwise use best score
                    const displayScore = isCurrent ? Math.max(bestScore, currentScore) : bestScore;
                    return (
                        <div
                            key={key}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '15px',
                                backgroundColor: isCurrent ? '#e3f2fd' : '#f5f5f5',
                                borderRadius: '15px',
                                border: isCurrent ? '3px solid #667eea' : '3px solid transparent',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ fontSize: '32px' }}>{emoji}</span>
                                <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{label}</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px' }}>
                                {renderStars(key, displayScore)}
                                <span style={{ fontSize: '16px', color: '#666' }}>
                                    {isCurrent ? `Current: ${currentScore}` : `Best: ${bestScore}`}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div style={{ 
                marginTop: '20px', 
                padding: '15px', 
                backgroundColor: '#fff3cd', 
                borderRadius: '15px',
                textAlign: 'center',
            }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                    Total Score: {progress.totalScore} 🎯
                </div>
                <div style={{ fontSize: '18px', marginTop: '5px' }}>
                    Rewards: {progress.rewards} 🏆
                </div>
            </div>
        </div>
    );
};

export default ProgressTracker;


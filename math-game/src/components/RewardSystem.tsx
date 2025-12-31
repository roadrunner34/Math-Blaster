import React, { useState, useEffect } from 'react';
import { Reward, getRewardForScore, createReward, getRewardMessage } from '../utils/rewards';
import { audioManager } from '../utils/audioManager';

interface RewardSystemProps {
    score: number;
    show: boolean;
    onClose: () => void;
}

const RewardSystem: React.FC<RewardSystemProps> = ({ score, show, onClose }) => {
    const [reward, setReward] = useState<Reward | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (show && score > 0) {
            const rewardType = getRewardForScore(score);
            const newReward = createReward(rewardType);
            setReward(newReward);
            setIsAnimating(true);
            audioManager.playReward();
            
            // Auto-close after 2 seconds
            setTimeout(() => {
                setIsAnimating(false);
                setTimeout(() => {
                    onClose();
                }, 500);
            }, 2000);
        }
    }, [show, score, onClose]);

    if (!show || !reward) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                animation: 'fadeIn 0.3s ease-out',
            }}
            onClick={onClose}
        >
            <div
                className={isAnimating ? 'animate-celebration' : ''}
                style={{
                    backgroundColor: '#fff',
                    borderRadius: '30px',
                    padding: '60px',
                    textAlign: 'center',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
                    maxWidth: '400px',
                    width: '90%',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div style={{ fontSize: '120px', marginBottom: '20px' }}>
                    {reward.emoji}
                </div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
                    {getRewardMessage(reward.type)}
                </div>
                <div style={{ fontSize: '24px', color: '#666' }}>
                    Score: {score}
                </div>
            </div>
        </div>
    );
};

export default RewardSystem;


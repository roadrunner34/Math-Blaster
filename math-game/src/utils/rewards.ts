// Reward system for tracking and displaying rewards

export interface Reward {
    type: 'star' | 'sticker' | 'trophy';
    emoji: string;
    timestamp: number;
}

export const rewardTypes = {
    star: { emoji: '⭐', points: 1 },
    sticker: { emoji: '🎖️', points: 5 },
    trophy: { emoji: '🏆', points: 10 },
};

export function getRewardForScore(score: number): Reward['type'] {
    if (score % 10 === 0 && score > 0) {
        return 'trophy';
    } else if (score % 5 === 0 && score > 0) {
        return 'sticker';
    } else {
        return 'star';
    }
}

export function createReward(type: Reward['type']): Reward {
    return {
        type,
        emoji: rewardTypes[type].emoji,
        timestamp: Date.now(),
    };
}

export function getRewardMessage(type: Reward['type']): string {
    const messages = {
        star: 'Great job! ⭐',
        sticker: 'Amazing! You got a sticker! 🎖️',
        trophy: 'Fantastic! You earned a trophy! 🏆',
    };
    return messages[type];
}


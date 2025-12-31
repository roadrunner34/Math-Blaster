// Progress tracking system using localStorage

export interface Progress {
    counting: number;
    addition: number;
    subtraction: number;
    shapes: number;
    patterns: number;
    totalScore: number;
    rewards: number;
    lastPlayed: string;
}

const STORAGE_KEY = 'mathBlasterProgress';

export function getProgress(): Progress {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.log('Error loading progress:', error);
    }
    
    // Return default progress
    return {
        counting: 0,
        addition: 0,
        subtraction: 0,
        shapes: 0,
        patterns: 0,
        totalScore: 0,
        rewards: 0,
        lastPlayed: new Date().toISOString(),
    };
}

export function saveProgress(progress: Progress): void {
    try {
        progress.lastPlayed = new Date().toISOString();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
        console.log('Error saving progress:', error);
    }
}

export function updateProgress(mode: keyof Progress, score: number): Progress {
    const progress = getProgress();
    
    if (mode === 'counting' || mode === 'addition' || mode === 'subtraction' || 
        mode === 'shapes' || mode === 'patterns') {
        progress[mode] = Math.max(progress[mode], score);
    }
    
    progress.totalScore += score;
    saveProgress(progress);
    
    return progress;
}

export function addReward(): Progress {
    const progress = getProgress();
    progress.rewards += 1;
    saveProgress(progress);
    return progress;
}

export function getStarsForMode(mode: keyof Progress): number {
    const progress = getProgress();
    const score = progress[mode] || 0;
    return Math.min(5, Math.floor(score / 5)); // 5 correct = 1 star, max 5 stars
}

export function resetProgress(): void {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.log('Error resetting progress:', error);
    }
}


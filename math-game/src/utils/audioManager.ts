// Audio Manager for sound effects and feedback
// Note: In a real implementation, you would add actual sound files to public/sounds/

class AudioManager {
    private sounds: Map<string, HTMLAudioElement> = new Map();
    private enabled: boolean = true;
    private volume: number = 0.7;

    constructor() {
        // Initialize audio context
        // For now, we'll use Web Audio API for simple beep sounds
        // In production, you'd load actual sound files
    }

    setEnabled(enabled: boolean) {
        this.enabled = enabled;
    }

    setVolume(volume: number) {
        this.volume = Math.max(0, Math.min(1, volume));
    }

    // Play a beep sound using Web Audio API (fallback if no sound files)
    private playBeep(frequency: number, duration: number, type: 'correct' | 'incorrect' | 'click' = 'click') {
        if (!this.enabled) return;

        try {
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = frequency;
            oscillator.type = type === 'correct' ? 'sine' : type === 'incorrect' ? 'sawtooth' : 'sine';

            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(this.volume, audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration);
        } catch (error) {
            console.log('Audio not available:', error);
        }
    }

    playCorrect() {
        // Play a pleasant sound for correct answers
        this.playBeep(523.25, 0.2, 'correct'); // C5 note
        setTimeout(() => this.playBeep(659.25, 0.2, 'correct'), 100); // E5 note
    }

    playIncorrect() {
        // Play a lower sound for incorrect answers
        this.playBeep(200, 0.3, 'incorrect');
    }

    playClick() {
        // Play a short click sound
        this.playBeep(800, 0.1, 'click');
    }

    playCelebration() {
        // Play a celebration sequence
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C, E, G, C
        notes.forEach((freq, index) => {
            setTimeout(() => this.playBeep(freq, 0.3, 'correct'), index * 150);
        });
    }

    playReward() {
        // Play reward sound
        this.playBeep(880, 0.4, 'correct'); // A5 note
    }

    // Load and play actual sound file (for future use with sound files)
    async loadSound(name: string, path: string): Promise<void> {
        try {
            const audio = new Audio(path);
            audio.volume = this.volume;
            this.sounds.set(name, audio);
        } catch (error) {
            console.log(`Could not load sound ${name}:`, error);
        }
    }

    async playSound(name: string): Promise<void> {
        if (!this.enabled) return;

        const sound = this.sounds.get(name);
        if (sound) {
            try {
                sound.currentTime = 0;
                await sound.play();
            } catch (error) {
                console.log(`Could not play sound ${name}:`, error);
            }
        }
    }
}

// Export singleton instance
export const audioManager = new AudioManager();
export default audioManager;


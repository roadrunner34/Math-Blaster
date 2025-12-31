# Sounds Directory

This directory is reserved for sound effect files (MP3/WAV format).

Currently, the game uses Web Audio API to generate beep sounds as a fallback.
To add actual sound files:

1. Add your sound files here (e.g., `correct.mp3`, `incorrect.mp3`, `celebration.mp3`)
2. Update `src/utils/audioManager.ts` to load and play these files using the `loadSound()` and `playSound()` methods


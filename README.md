# Math Blaster! 🚀

A fun and interactive math learning game designed for toddlers to learn numbers, counting, addition, subtraction, shapes, and patterns through engaging gameplay with visual feedback and a rewarding progress system.

## Overview

Math Blaster is a React-based educational game that makes learning math fun for young children. The game features multiple game modes, visual counters, progress tracking with stars, and a reward system that encourages continued learning. All progress is saved locally in the browser, so children can track their improvement over time.

## Features

- 🎮 **5 Different Game Modes**: Counting, Addition, Subtraction, Shapes, and Patterns
- ⭐ **Star Rating System**: Earn up to 5 stars per game mode (1 star per 5 correct answers)
- 🏆 **Reward System**: Earn stars, stickers, and trophies as you progress
- 📊 **Progress Tracking**: Visual progress tracker showing best scores and current progress
- 💾 **Local Storage**: Progress is automatically saved and persists between sessions
- 🔊 **Audio Feedback**: Sound effects for correct and incorrect answers
- 🎨 **Colorful UI**: Beautiful gradient colors and emojis for each game mode
- 📱 **Responsive Design**: Works on desktop and tablet devices

## Game Modes

### 🔢 Counting
Practice counting with visual items and number recognition.

### ➕ Addition
Learn addition with numbers and visual aids to help understand the concept.

### ➖ Subtraction
Practice subtraction problems with helpful visual representations.

### 🔷 Shapes
Identify and learn about different shapes.

### 🎨 Patterns
Recognize and complete patterns to develop logical thinking skills.

## Technologies Used

- **React 18.2.0**: Modern React with hooks and functional components
- **TypeScript 4.9.5**: Type-safe JavaScript for better code quality
- **Create React App**: Development environment and build tools
- **CSS3**: Custom styling with animations and gradients
- **LocalStorage API**: Persistent data storage

## Project Structure

```
math-game/
├── public/
│   ├── index.html          # Main HTML file
│   └── sounds/             # Audio files directory
├── src/
│   ├── components/
│   │   ├── AdditionGame.tsx        # Addition game component
│   │   ├── CountableItem.tsx       # Visual counting items
│   │   ├── Game.tsx                # Main game logic and state
│   │   ├── GameModeSelector.tsx    # Game mode selection screen
│   │   ├── PatternsGame.tsx        # Patterns game component
│   │   ├── ProgressTracker.tsx     # Progress display component
│   │   ├── RewardSystem.tsx        # Reward animations and display
│   │   ├── ShapesGame.tsx          # Shapes game component
│   │   ├── SubtractionGame.tsx     # Subtraction game component
│   │   └── VisualCounter.tsx       # Visual number counter
│   ├── Questions/
│   │   └── Questions.tsx           # Question generation utilities
│   ├── styles/
│   │   ├── App.css                 # Main application styles
│   │   └── animations.css           # CSS animations
│   ├── utils/
│   │   ├── audioManager.ts         # Audio playback management
│   │   ├── mathUtils.ts            # Math utility functions
│   │   ├── progress.ts              # Progress tracking and localStorage
│   │   └── rewards.ts               # Reward system logic
│   ├── App.tsx                      # Main application component
│   └── index.tsx                    # Application entry point
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # This file
```

## Setup Instructions

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the project directory**:
   ```bash
   cd math-game
   ```

3. **Install the dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm start
   ```

   The application will open in your browser at `http://localhost:3000`

5. **Build for production** (optional):
   ```bash
   npm run build
   ```

## How to Play

1. **Select a Game Mode**: Choose from Counting, Addition, Subtraction, Shapes, or Patterns from the main menu
2. **Answer Questions**: Each game mode presents questions appropriate for that mode
3. **Get Feedback**: 
   - Correct answers play a success sound and show positive feedback
   - Incorrect answers play a different sound and allow you to try again
4. **Earn Rewards**: 
   - Every 5 correct answers = 1 star ⭐
   - Every 5 answers = Sticker reward 🎖️
   - Every 10 answers = Trophy reward 🏆
5. **Track Progress**: View your progress with stars on each game mode button and in the progress tracker
6. **Return to Menu**: Click the back button to return to the game mode selector

## Progress & Rewards System

### Star Rating
- Each game mode can earn up to 5 stars
- 1 star = 5 correct answers
- Stars are displayed on the game mode selector and progress tracker
- Your best score for each mode is saved automatically

### Rewards
- **Stars** ⭐: Earned for every correct answer
- **Stickers** 🎖️: Earned every 5 correct answers
- **Trophies** 🏆: Earned every 10 correct answers

### Progress Tracking
- All progress is saved in browser localStorage
- Total score across all game modes is tracked
- Best score for each individual game mode is recorded
- Progress persists between browser sessions

## Development

### Available Scripts

- `npm start`: Runs the app in development mode
- `npm run build`: Builds the app for production
- `npm test`: Launches the test runner
- `npm run eject`: Ejects from Create React App (one-way operation)

### TypeScript

The project uses TypeScript for type safety. The configuration is in `tsconfig.json`. Key types include:
- `GameMode`: Union type for game modes ('counting' | 'addition' | 'subtraction' | 'shapes' | 'patterns')
- `Progress`: Interface for tracking user progress
- `Reward`: Interface for reward system

## Browser Support

The application supports modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this project for learning or educational purposes.

## Contributing

This is an educational project. Feel free to fork, modify, and use it as a learning resource!

---

**Enjoy learning math with Math Blaster!** 🎉📚

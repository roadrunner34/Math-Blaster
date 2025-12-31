# Math Game for Toddlers

This project is a simple math game designed to help toddlers learn their numbers through interactive gameplay. The game presents random math questions and allows children to practice their addition and subtraction skills in a fun and engaging way.

## Project Structure

- **src/**
  - **App.tsx**: Main entry point of the application, setting up the game interface.
  - **components/**
    - **Game.tsx**: Contains the game logic, including methods to start the game, check answers, and reset the game.
  - **styles/**
    - **App.css**: Styles for the application, defining the layout and appearance of game components.
  - **utils/**
    - **mathUtils.ts**: Utility functions for generating random math questions and validating answers.

- **package.json**: Configuration file for npm, listing dependencies and scripts.
- **tsconfig.json**: TypeScript configuration file specifying compiler options and included files.
- **README.md**: Documentation for the project, including setup instructions and game rules.

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd math-game
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Start the application:
   ```
   npm start
   ```

## Game Rules

- The game will present a series of math questions to the player.
- Players must input their answers to progress.
- The game keeps track of the score and provides feedback on correct and incorrect answers.
- Players can reset the game at any time to start over.

Enjoy learning numbers with this fun math game!
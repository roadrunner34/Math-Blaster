import React, { Component } from 'react';
import { GameMode } from './GameModeSelector';
import VisualCounter from './VisualCounter';
import AdditionGame from './AdditionGame';
import SubtractionGame from './SubtractionGame';
import ShapesGame from './ShapesGame';
import PatternsGame from './PatternsGame';
import RewardSystem from './RewardSystem';
import ProgressTracker from './ProgressTracker';
import { generateCountingQuestion, generateAdditionQuestion, generateSubtractionQuestion } from '../Questions/Questions';
import { audioManager } from '../utils/audioManager';
import { updateProgress, addReward, getProgress, Progress } from '../utils/progress';
import { getRewardForScore } from '../utils/rewards';
import '../styles/animations.css';

interface GameProps {
    mode: GameMode;
    onBack: () => void;
}

interface GameState {
    score: number;
    questionNumber: number;
    showReward: boolean;
    isCorrect: boolean | null;
    progress: Progress;
    // Counting state
    countingTarget?: number;
    countingItemType?: 'animals' | 'fruits' | 'shapes';
    // Addition/Subtraction state
    num1?: number;
    num2?: number;
    // Shapes/Patterns state
    correctAnswer?: string;
}

class Game extends Component<GameProps, GameState> {
    constructor(props: GameProps) {
        super(props);
        this.state = {
            score: 0,
            questionNumber: 0,
            showReward: false,
            isCorrect: null,
            progress: getProgress(),
            countingTarget: undefined,
            countingItemType: undefined,
            num1: undefined,
            num2: undefined,
        };
    }

    componentDidMount() {
        this.generateNewQuestion();
    }

    generateNewQuestion = () => {
        this.setState({ isCorrect: null, correctAnswer: undefined });
        
        switch (this.props.mode) {
            case 'counting':
                const counting = generateCountingQuestion(10);
                this.setState({
                    countingTarget: counting.targetCount,
                    countingItemType: counting.itemType,
                });
                break;
            case 'addition':
                const addition = generateAdditionQuestion(10);
                this.setState({ num1: addition.num1, num2: addition.num2 });
                break;
            case 'subtraction':
                const subtraction = generateSubtractionQuestion(10);
                this.setState({ num1: subtraction.num1, num2: subtraction.num2 });
                break;
            case 'shapes':
            case 'patterns':
                // These games generate their own questions and will set correctAnswer via callback
                break;
        }
    };

    handleAnswer = (answer: number | string, isCorrectOverride?: boolean) => {
        const { mode } = this.props;
        let correct = false;
        let correctAnswer: number | string = 0;

        // If isCorrectOverride is provided (from shapes/patterns), use it
        if (isCorrectOverride !== undefined) {
            correct = isCorrectOverride;
        } else {
            switch (mode) {
                case 'counting':
                    correctAnswer = this.state.countingTarget || 0;
                    correct = answer === correctAnswer;
                    break;
                case 'addition':
                    correctAnswer = (this.state.num1 || 0) + (this.state.num2 || 0);
                    correct = answer === correctAnswer;
                    break;
                case 'subtraction':
                    correctAnswer = (this.state.num1 || 0) - (this.state.num2 || 0);
                    correct = answer === correctAnswer;
                    break;
                case 'shapes':
                case 'patterns':
                    // These should use isCorrectOverride
                    correct = false;
                    break;
            }
        }

        this.setState({ isCorrect: correct });

        if (correct) {
            audioManager.playCorrect();
            const newScore = this.state.score + 1;
            this.setState({ 
                score: newScore,
                questionNumber: this.state.questionNumber + 1,
            });

            // Update progress
            const updatedProgress = updateProgress(mode, newScore);
            this.setState({ progress: updatedProgress });

            // Check for reward
            const rewardType = getRewardForScore(newScore);
            if (rewardType !== 'star' || newScore % 5 === 0) {
                addReward();
                this.setState({ showReward: true });
            }

            // Generate new question after a delay
            setTimeout(() => {
                this.generateNewQuestion();
            }, 1500);
        } else {
            audioManager.playIncorrect();
            // Show feedback and allow retry
            setTimeout(() => {
                this.setState({ isCorrect: null });
            }, 1500);
        }
    };

    handleRewardClose = () => {
        this.setState({ showReward: false });
    };

    handleBack = () => {
        this.props.onBack();
    };

    render() {
        const { mode } = this.props;
        const { score, questionNumber, showReward, isCorrect, progress, countingTarget, countingItemType, num1, num2 } = this.state;

        return (
            <div className="game-container">
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    width: '100%',
                    marginBottom: '20px',
                }}>
                    <button className="button button-secondary" onClick={this.handleBack}>
                        ← Back
                    </button>
                    <div className="score">
                        Score: {score} | Question: {questionNumber + 1}
                    </div>
                </div>

                {isCorrect === true && (
                    <div className="animate-correct" style={{
                        fontSize: '48px',
                        color: '#4caf50',
                        fontWeight: 'bold',
                        margin: '20px 0',
                        textAlign: 'center',
                    }}>
                        Correct! 🎉
                    </div>
                )}

                {isCorrect === false && (
                    <div className="animate-incorrect" style={{
                        fontSize: '48px',
                        color: '#f44336',
                        fontWeight: 'bold',
                        margin: '20px 0',
                        textAlign: 'center',
                    }}>
                        Try again! 💪
                    </div>
                )}

                {mode === 'counting' && countingTarget && countingItemType && (
                    <VisualCounter
                        targetCount={countingTarget}
                        itemType={countingItemType}
                        onComplete={() => {}}
                        onAnswer={this.handleAnswer}
                    />
                )}

                {mode === 'addition' && num1 !== undefined && num2 !== undefined && (
                    <AdditionGame
                        num1={num1}
                        num2={num2}
                        onAnswer={this.handleAnswer}
                    />
                )}

                {mode === 'subtraction' && num1 !== undefined && num2 !== undefined && (
                    <SubtractionGame
                        num1={num1}
                        num2={num2}
                        onAnswer={this.handleAnswer}
                    />
                )}

                {mode === 'shapes' && (
                    <ShapesGame onAnswer={(answer, isCorrect) => {
                        this.handleAnswer(answer, isCorrect);
                    }} />
                )}

                {mode === 'patterns' && (
                    <PatternsGame onAnswer={(answer, isCorrect) => {
                        this.handleAnswer(answer, isCorrect);
                    }} />
                )}

                <ProgressTracker 
                    progress={progress} 
                    currentMode={mode}
                    currentScore={score}
                />

                <RewardSystem
                    score={score}
                    show={showReward}
                    onClose={this.handleRewardClose}
                />
            </div>
        );
    }
}

export default Game;

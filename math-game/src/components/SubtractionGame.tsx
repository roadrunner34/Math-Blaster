import React, { useState, useEffect } from 'react';
import CountableItem from './CountableItem';

interface SubtractionGameProps {
    num1: number;
    num2: number;
    onAnswer: (answer: number) => void;
}

const itemSets = ['🐱', '🐶', '🐰', '🐻', '🐼', '🦊', '🐸', '🐯', '🦁', '🐨'];

const SubtractionGame: React.FC<SubtractionGameProps> = ({ num1, num2, onAnswer }) => {
    const [answerOptions, setAnswerOptions] = useState<number[]>([]);
    const [selectedItems, setSelectedItems] = useState<boolean[]>([]);
    const correctAnswer = num1 - num2;

    useEffect(() => {
        // Initialize with all items visible
        setSelectedItems(new Array(num1).fill(false));
        
        // Generate answer options
        const options = [correctAnswer];
        while (options.length < 4) {
            const wrongAnswer = Math.max(0, correctAnswer + Math.floor(Math.random() * 6) - 3);
            if (!options.includes(wrongAnswer) && wrongAnswer >= 0) {
                options.push(wrongAnswer);
            }
        }
        setAnswerOptions(options.sort(() => Math.random() - 0.5));
    }, [num1, num2, correctAnswer]);

    const handleItemClick = (index: number) => {
        const newSelected = [...selectedItems];
        newSelected[index] = !newSelected[index];
        setSelectedItems(newSelected);
    };

    const handleAnswerClick = (answer: number) => {
        onAnswer(answer);
    };

    const removedCount = selectedItems.filter(Boolean).length;
    const remainingCount = num1 - removedCount;

    return (
        <div className="subtraction-game-container">
            <div className="question" style={{ fontSize: '36px', marginBottom: '30px' }}>
                {num1} - {num2} = ?
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
                <div>
                    <div style={{ fontSize: '24px', marginBottom: '15px', fontWeight: 'bold' }}>
                        Start with {num1} animals. Remove {num2}:
                    </div>
                    <div className="visual-items-container">
                        {Array.from({ length: num1 }).map((_, i) => (
                            <CountableItem
                                key={`animal-${i}`}
                                item="animal"
                                emoji={itemSets[i % itemSets.length]}
                                isSelected={selectedItems[i]}
                                onClick={() => handleItemClick(i)}
                                size={70}
                            />
                        ))}
                    </div>
                    <div style={{ fontSize: '24px', marginTop: '15px', fontWeight: 'bold', color: '#667eea' }}>
                        Removed: {removedCount} | Remaining: {remainingCount}
                    </div>
                </div>
            </div>
            
            <div className="answer-options" style={{ marginTop: '40px' }}>
                <div className="question" style={{ fontSize: '28px', marginBottom: '20px' }}>
                    How many are left?
                </div>
                {answerOptions.map((option) => (
                    <button
                        key={option}
                        className="answer-button"
                        onClick={() => handleAnswerClick(option)}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SubtractionGame;


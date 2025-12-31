import React, { useState, useEffect } from 'react';
import CountableItem from './CountableItem';

interface AdditionGameProps {
    num1: number;
    num2: number;
    onAnswer: (answer: number) => void;
}

const itemSets = ['🍎', '🍌', '🍇', '🍓', '🍊', '🍉', '🍑', '🍒', '🥝', '🍍'];

const AdditionGame: React.FC<AdditionGameProps> = ({ num1, num2, onAnswer }) => {
    const [answerOptions, setAnswerOptions] = useState<number[]>([]);
    const correctAnswer = num1 + num2;

    useEffect(() => {
        // Generate answer options
        const options = [correctAnswer];
        while (options.length < 4) {
            const wrongAnswer = Math.max(1, correctAnswer + Math.floor(Math.random() * 10) - 5);
            if (!options.includes(wrongAnswer) && wrongAnswer > 0) {
                options.push(wrongAnswer);
            }
        }
        setAnswerOptions(options.sort(() => Math.random() - 0.5));
    }, [num1, num2, correctAnswer]);

    const handleAnswerClick = (answer: number) => {
        onAnswer(answer);
    };

    return (
        <div className="addition-game-container">
            <div className="question" style={{ fontSize: '36px', marginBottom: '30px' }}>
                {num1} + {num2} = ?
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'center' }}>
                <div>
                    <div style={{ fontSize: '24px', marginBottom: '15px', fontWeight: 'bold' }}>
                        First group: {num1}
                    </div>
                    <div className="visual-items-container">
                        {Array.from({ length: num1 }).map((_, i) => (
                            <CountableItem
                                key={`group1-${i}`}
                                item="fruit"
                                emoji={itemSets[i % itemSets.length]}
                                isSelected={false}
                                onClick={() => {}}
                                size={70}
                            />
                        ))}
                    </div>
                </div>
                
                <div style={{ fontSize: '48px' }}>+</div>
                
                <div>
                    <div style={{ fontSize: '24px', marginBottom: '15px', fontWeight: 'bold' }}>
                        Second group: {num2}
                    </div>
                    <div className="visual-items-container">
                        {Array.from({ length: num2 }).map((_, i) => (
                            <CountableItem
                                key={`group2-${i}`}
                                item="fruit"
                                emoji={itemSets[(i + num1) % itemSets.length]}
                                isSelected={false}
                                onClick={() => {}}
                                size={70}
                            />
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="answer-options" style={{ marginTop: '40px' }}>
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

export default AdditionGame;


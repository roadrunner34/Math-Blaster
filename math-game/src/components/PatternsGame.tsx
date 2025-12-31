import React, { useState, useEffect } from 'react';

interface PatternsGameProps {
    onAnswer: (answer: string, isCorrect: boolean) => void;
}

const patternItems = ['🔴', '🟢', '🔵', '🟡', '🟣', '🟠'];
const patternShapes = ['⭕', '⬜', '🔺', '⭐'];

const PatternsGame: React.FC<PatternsGameProps> = ({ onAnswer }) => {
    const [pattern, setPattern] = useState<string[]>([]);
    const [answerOptions, setAnswerOptions] = useState<string[]>([]);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [patternType, setPatternType] = useState<'color' | 'shape'>('color');

    useEffect(() => {
        const type = Math.random() < 0.5 ? 'color' : 'shape';
        setPatternType(type);
        
        const items = type === 'color' ? patternItems : patternShapes;
        
        // Create a pattern (e.g., A-B-A-B or A-A-B-B)
        const patternLength = 4;
        const basePattern: string[] = [];
        const firstItem = items[Math.floor(Math.random() * items.length)];
        const secondItem = items.find(item => item !== firstItem) || items[0];
        
        // Create pattern like A-B-A-B
        for (let i = 0; i < patternLength; i++) {
            basePattern.push(i % 2 === 0 ? firstItem : secondItem);
        }
        
        // The next item should be firstItem (continuing the pattern)
        const nextItem = firstItem;
        setCorrectAnswer(nextItem);
        setPattern(basePattern);
        
        // Generate answer options
        const options = [nextItem];
        while (options.length < 4) {
            const randomItem = items[Math.floor(Math.random() * items.length)];
            if (!options.includes(randomItem)) {
                options.push(randomItem);
            }
        }
        setAnswerOptions(options.sort(() => Math.random() - 0.5));
    }, []);

    const handleAnswerClick = (answer: string) => {
        // Check if answer is correct and pass to parent
        const isCorrect = answer === correctAnswer;
        onAnswer(answer, isCorrect);
    };

    return (
        <div className="patterns-game-container">
            <div className="question" style={{ fontSize: '36px', marginBottom: '30px' }}>
                What comes next in the pattern?
            </div>
            
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '30px', 
                alignItems: 'center',
                margin: '40px 0'
            }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                    Pattern:
                </div>
                <div className="visual-items-container" style={{ margin: '20px 0' }}>
                    {pattern.map((item, index) => (
                        <div
                            key={index}
                            style={{
                                fontSize: '80px',
                                padding: '15px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            {item}
                        </div>
                    ))}
                    <div
                        style={{
                            fontSize: '80px',
                            padding: '15px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '5px dashed #667eea',
                            borderRadius: '20px',
                            minWidth: '100px',
                            minHeight: '100px',
                            backgroundColor: 'rgba(102, 126, 234, 0.1)',
                        }}
                    >
                        ?
                    </div>
                </div>
            </div>
            
            <div className="answer-options" style={{ marginTop: '40px' }}>
                {answerOptions.map((option) => (
                    <button
                        key={option}
                        className="answer-button"
                        onClick={() => handleAnswerClick(option)}
                        style={{ fontSize: '60px' }}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PatternsGame;


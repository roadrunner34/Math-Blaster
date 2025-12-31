import React, { useState, useEffect } from 'react';

interface ShapesGameProps {
    onAnswer: (answer: string, isCorrect: boolean) => void;
}

const shapes = [
    { name: 'circle', emoji: '⭕', color: '#ff6b6b' },
    { name: 'square', emoji: '⬜', color: '#4ecdc4' },
    { name: 'triangle', emoji: '🔺', color: '#ffe66d' },
    { name: 'star', emoji: '⭐', color: '#ffd93d' },
    { name: 'heart', emoji: '❤️', color: '#ff6b9d' },
    { name: 'diamond', emoji: '💎', color: '#a8e6cf' },
];

const ShapesGame: React.FC<ShapesGameProps> = ({ onAnswer }) => {
    const [targetShape, setTargetShape] = useState(shapes[0]);
    const [answerOptions, setAnswerOptions] = useState<string[]>([]);
    const [questionType, setQuestionType] = useState<'identify' | 'match'>('identify');
    const [correctAnswer, setCorrectAnswer] = useState('');

    useEffect(() => {
        // Randomly choose question type
        const type = Math.random() < 0.5 ? 'identify' : 'match';
        setQuestionType(type);
        
        // Select random target shape
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        setTargetShape(randomShape);
        setCorrectAnswer(randomShape.name);
        
        // Generate answer options
        const options = [randomShape.name];
        const otherShapes = shapes.filter(s => s.name !== randomShape.name);
        while (options.length < 4) {
            const randomOther = otherShapes[Math.floor(Math.random() * otherShapes.length)].name;
            if (!options.includes(randomOther)) {
                options.push(randomOther);
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
        <div className="shapes-game-container">
            {questionType === 'identify' ? (
                <>
                    <div className="question" style={{ fontSize: '36px', marginBottom: '30px' }}>
                        What shape is this?
                    </div>
                    <div style={{ 
                        fontSize: '120px', 
                        margin: '40px 0',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        {targetShape.emoji}
                    </div>
                </>
            ) : (
                <>
                    <div className="question" style={{ fontSize: '36px', marginBottom: '30px' }}>
                        Find the {targetShape.name}:
                    </div>
                    <div className="visual-items-container" style={{ margin: '40px 0' }}>
                        {shapes.map((shape, index) => (
                            <div
                                key={index}
                                style={{
                                    fontSize: '80px',
                                    padding: '20px',
                                    cursor: 'pointer',
                                    borderRadius: '20px',
                                    backgroundColor: '#fff',
                                    border: '5px solid #667eea',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                {shape.emoji}
                            </div>
                        ))}
                    </div>
                </>
            )}
            
            <div className="answer-options" style={{ marginTop: '40px' }}>
                {answerOptions.map((option) => {
                    const shape = shapes.find(s => s.name === option);
                    return (
                        <button
                            key={option}
                            className="answer-button"
                            onClick={() => handleAnswerClick(option)}
                            style={{ fontSize: '28px', padding: '20px' }}
                        >
                            {shape?.emoji} {shape?.name}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default ShapesGame;


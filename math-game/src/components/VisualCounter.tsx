import React, { useState, useEffect } from 'react';
import CountableItem from './CountableItem';

interface VisualCounterProps {
    targetCount: number;
    itemType: 'animals' | 'fruits' | 'shapes';
    onComplete: (count: number) => void;
    onAnswer: (answer: number) => void;
}

const itemSets = {
    animals: ['🐱', '🐶', '🐰', '🐻', '🐼', '🦊', '🐸', '🐯', '🦁', '🐨'],
    fruits: ['🍎', '🍌', '🍇', '🍓', '🍊', '🍉', '🍑', '🍒', '🥝', '🍍'],
    shapes: ['🔴', '🟢', '🔵', '🟡', '🟣', '🟠', '⚫', '⚪', '🟤', '🔶'],
};

const VisualCounter: React.FC<VisualCounterProps> = ({ 
    targetCount, 
    itemType, 
    onComplete,
    onAnswer 
}) => {
    const [selectedCount, setSelectedCount] = useState(0);
    const [selectedItems, setSelectedItems] = useState<boolean[]>([]);
    const [showAnswer, setShowAnswer] = useState(false);
    const [answerOptions, setAnswerOptions] = useState<number[]>([]);

    useEffect(() => {
        // Initialize items array
        const items = new Array(targetCount + 3).fill(false); // Show a few extra items
        setSelectedItems(items);
        setSelectedCount(0);
        setShowAnswer(false);
        
        // Generate answer options (include correct answer + 3 wrong answers)
        const options = [targetCount];
        while (options.length < 4) {
            const wrongAnswer = Math.floor(Math.random() * 20) + 1;
            if (!options.includes(wrongAnswer)) {
                options.push(wrongAnswer);
            }
        }
        // Shuffle options
        setAnswerOptions(options.sort(() => Math.random() - 0.5));
    }, [targetCount]);

    const handleItemClick = (index: number) => {
        if (showAnswer) return;
        
        const newSelected = [...selectedItems];
        newSelected[index] = !newSelected[index];
        setSelectedItems(newSelected);
        
        const newCount = newSelected.filter(Boolean).length;
        setSelectedCount(newCount);
        
        if (newCount === targetCount) {
            setShowAnswer(true);
            onComplete(newCount);
        }
    };

    const handleAnswerClick = (answer: number) => {
        onAnswer(answer);
    };

    const items = itemSets[itemType];
    const displayItems = new Array(targetCount + 3).fill(0).map((_, i) => ({
        emoji: items[i % items.length],
        index: i,
    }));

    return (
        <div className="visual-counter-container">
            <div className="question">
                Count {targetCount} {itemType}!
            </div>
            
            <div className="visual-items-container">
                {displayItems.map(({ emoji, index }) => (
                    <CountableItem
                        key={index}
                        item={itemType}
                        emoji={emoji}
                        isSelected={selectedItems[index]}
                        onClick={() => handleItemClick(index)}
                        size={90}
                    />
                ))}
            </div>
            
            <div className="score" style={{ fontSize: '36px', margin: '20px 0' }}>
                Count: {selectedCount} / {targetCount}
            </div>
            
            {showAnswer && (
                <div className="animate-fade-in" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="question" style={{ fontSize: '28px', marginBottom: '20px' }}>
                        How many did you count?
                    </div>
                    <div className="answer-options">
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
            )}
        </div>
    );
};

export default VisualCounter;


import React from 'react';

interface CountableItemProps {
    item: string;
    emoji: string;
    isSelected: boolean;
    onClick: () => void;
    size?: number;
}

const CountableItem: React.FC<CountableItemProps> = ({ 
    item, 
    emoji, 
    isSelected, 
    onClick,
    size = 80 
}) => {
    return (
        <div
            className={`countable-item ${isSelected ? 'selected' : ''} animate-fade-in`}
            onClick={onClick}
            style={{
                width: `${size}px`,
                height: `${size}px`,
                fontSize: `${size * 0.6}px`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                borderRadius: '50%',
                backgroundColor: isSelected ? '#ffd700' : '#fff',
                border: `5px solid ${isSelected ? '#ff6b6b' : '#667eea'}`,
                boxShadow: isSelected 
                    ? '0 0 20px rgba(255, 215, 0, 0.6)' 
                    : '0 4px 8px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease',
                userSelect: 'none',
            }}
        >
            {emoji}
        </div>
    );
};

export default CountableItem;


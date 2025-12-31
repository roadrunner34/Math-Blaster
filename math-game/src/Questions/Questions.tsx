// Question generators for all game modes

export interface Question {
    question: string;
    answer: number | string;
    type?: string;
}

// Counting questions
export function generateCountingQuestion(maxCount: number = 10): { targetCount: number; itemType: 'animals' | 'fruits' | 'shapes' } {
    const targetCount = Math.floor(Math.random() * maxCount) + 1;
    const itemTypes: Array<'animals' | 'fruits' | 'shapes'> = ['animals', 'fruits', 'shapes'];
    const itemType = itemTypes[Math.floor(Math.random() * itemTypes.length)];
    return { targetCount, itemType };
}

// Addition questions
export function generateAdditionQuestion(maxSum: number = 10): { num1: number; num2: number } {
    const num1 = Math.floor(Math.random() * (maxSum - 1)) + 1;
    const num2 = Math.floor(Math.random() * (maxSum - num1)) + 1;
    return { num1, num2 };
}

// Subtraction questions
export function generateSubtractionQuestion(maxNum: number = 10): { num1: number; num2: number } {
    const num1 = Math.floor(Math.random() * maxNum) + 2;
    const num2 = Math.floor(Math.random() * (num1 - 1)) + 1;
    return { num1, num2 };
}

// Legacy function for backward compatibility
export const generateMathQuestion = (): Question => {
    const isAddition = Math.random() < 0.5;
    
    if (isAddition) {
        const num1 = Math.floor(Math.random() * 9) + 1;
        const num2 = Math.floor(Math.random() * (10 - num1)) + 1;
        return {
            question: `${num1} + ${num2} = ?`,
            answer: num1 + num2
        };
    } else {
        const answer = Math.floor(Math.random() * 9) + 1;
        const num1 = Math.floor(Math.random() * (10 - answer)) + answer;
        return {
            question: `${num1} - ${num1 - answer} = ?`,
            answer: answer
        };
    }
};

// Animal questions (legacy)
export const animalMathQuestions = [
    { question: "If there are 3 cats and 2 dogs, how many animals are there?", answer: 5 },
    { question: "If there are 4 cats and 3 dogs, how many animals are there?", answer: 7 },
    { question: "If there are 2 cats and 1 dog, how many animals are there?", answer: 3 },
    { question: "If there are 1 cat and 2 dogs, how many animals are there?", answer: 3 },
    { question: "If there are 2 cats and 2 dogs, how many animals are there?", answer: 4 },
];

export const getRandomAnimalQuestion = (): Question => {
    const randomIndex = Math.floor(Math.random() * animalMathQuestions.length);
    return animalMathQuestions[randomIndex];
};

// Food questions (legacy)
export const generateFoodQuestion = (): Question => {
    const fruits = ['apple', 'orange', 'banana', 'pear'];
    const fruit1 = fruits[Math.floor(Math.random() * fruits.length)];
    const fruit2 = fruits[Math.floor(Math.random() * fruits.length)];
    const num1 = Math.floor(Math.random() * 4) + 1;
    const num2 = Math.floor(Math.random() * 4) + 1;
    const total = num1 + num2;
    
    return {
        question: `If there are ${num1} ${fruit1}${num1 === 1 ? '' : 's'} and ${num2} ${fruit2}${num2 === 1 ? '' : 's'}, how many fruits are there?`,
        answer: total
    };
};

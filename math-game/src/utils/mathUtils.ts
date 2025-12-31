export function generateQuestion() {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const operator = Math.random() < 0.5 ? '+' : '-';
    const question = `${num1} ${operator} ${num2}`;
    const answer = operator === '+' ? num1 + num2 : num1 - num2;
    return { question, answer };
}

export function validateAnswer(userAnswer: number, correctAnswer: number): boolean {
    return userAnswer === correctAnswer;
}
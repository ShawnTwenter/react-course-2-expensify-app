const add = (a, b) => {
    return a + b;
};

const generateGreeting = (name = 'Anonymous') => `Hello ${name}!`;


test('adds 1 + 2 to equal 3', () => {
    const result = add(1, 2);
    expect(result).toBe(3);
});

test('Should generate greeting', () => {
    const result = generateGreeting('Shawn')
    expect(result).toBe('Hello Shawn!');
});

test('Should generate greeting for no name', () => {
    const result = generateGreeting();
    expect(result).toBe('Hello Anonymous!');
})
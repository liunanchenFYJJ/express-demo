const { sum, sum1 } = require('./jest')

test('sum', () => {
    expect(sum()).toBe(1);
})

test('sum1', () => {
    expect(sum1()).toBe(11);
})
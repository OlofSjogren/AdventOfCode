
// ##################### Part 1 #####################

const fs = require('fs')
const content = fs.readFileSync(process.cwd() + "\\" + "day_10_data.txt").toString()
const contentArr = content
    .split("\r\n")
    .map(row => row.split(""))

const opening = ['(', '[', '{', '<']
const closing = [')', ']', '}', '>']

const checkTable = new Map([
    [')', 3],
    [']', 57],
    ['}', 1197],
    ['>', 25137]
])

const corruptedClosing = []
const nonCorruptedLines = []

contentArr.forEach(line => {
    let corrupted = false
    const stack = []
    for (let i = 0; i < line.length; i++) {
        const char = line[i]
        if (opening.includes(char)) {
            stack.push(char)
        } else {
            const top = stack.pop()
            if (opening.indexOf(top) !== closing.indexOf(char)) {
                corrupted = true
                corruptedClosing.push(char)
                break;
            }
        }
    }
    if (!corrupted) nonCorruptedLines.push(stack)
})

const syntaxErrorScore = corruptedClosing.reduce((prev, char) => prev + checkTable.get(char), 0)

// Answer part 1
console.log({ syntaxErrorScore });

// ##################### Part 2 #####################

const autoCompleteTable = new Map([
    ['(', 1],
    ['[', 2],
    ['{', 3],
    ['<', 4]
])

const middleScore = nonCorruptedLines
    .map(line => line
        .reverse()
        .reduce((prev, char) =>
            (prev * 5) + autoCompleteTable.get(char), 0))
    .sort((a, b) => a - b)[Math.floor(nonCorruptedLines.length / 2)]

// Answer part 1
console.log({ middleScore });



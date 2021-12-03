
// ##################### Part 1 #####################

const fs = require('fs')
const content = fs.readFileSync(process.cwd() + "/" + "day_2_data.txt").toString()
const contentArr = content
    .split("\r\n")
    .map(str => {
        let dir = str.split(" ")
        return {
            instruction: dir[0],
            amount: parseInt(dir[1])
        }
    })

let hPos = 0
let depth = 0

contentArr.forEach(elem => {
    switch (elem.instruction) {
        case "up":
            depth -= elem.amount
            break;
        case "down":
            depth += elem.amount
            break;
        default:
            hPos += elem.amount
            break;
    }
});

// Part 1 answer
// console.log(`hPos is: ${hPos}, depth is: ${depth}, multiplied ${hPos * depth}`);

// ##################### Part 2 #####################

let aim = 0
let realDepth = 0
let realHPos = 0

contentArr.forEach(elem => {
    switch (elem.instruction) {
        case "up":
            aim -= elem.amount
            break;
        case "down":
            aim += elem.amount
            break;
        default:
            realHPos += elem.amount
            realDepth += aim * elem.amount
            break;
    }
});

// Part 2 answer
console.log(`realHPos is: ${realHPos}, realDepth is: ${realDepth}, multiplied ${realHPos * realDepth}`);

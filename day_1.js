

// ##################### Part 1 #####################

const fs = require('fs')
const content = fs.readFileSync(process.cwd() + "/" + "day_1_data.txt").toString()
const contentArr = content.split("\r\n").map(str => parseInt(str))

let counter = 0
for (let i = 0; i < (contentArr.length - 2); i++) {
    let current = contentArr[i]
    let next = contentArr[i + 1]
    if (current < next) counter++
}

// Correct! -> 1400
//console.log(counter);


// ##################### Part 2 #####################
prevSum = contentArr[0] + contentArr[1] + contentArr[2]

let threeCounter = 0
for (let i = 1; i < (contentArr.length - 2); i++) {
    let sum = contentArr[i] + contentArr[i + 1] + contentArr[i + 2]

    if (sum > prevSum) threeCounter++

    prevSum = sum
}

console.log(threeCounter);


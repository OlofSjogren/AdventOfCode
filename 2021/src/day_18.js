// ##################### Part 1 #####################

const fs = require('fs')
const content = fs.readFileSync(process.cwd() + "\\" + "day_18_data.txt").toString()
const numberList = content.split("\r\n")

function explode(str) {
    counter = 0
    for (let i = 0; i < str.length; i++) {
        const c = str[i]
        if (c === "[") counter++
        if (counter === 5 && c === "[") {
            const closeIndex = str.slice(i).indexOf("]")
            const values = str.substring(i + 1, i + closeIndex + 1).split(",")
            let leftPart = str.slice(0, i)
            let rightPart = str.slice(i + closeIndex + 1)

            let match = leftPart.match(/\d+/g);
            if (match) {
                const leftIndex = leftPart.lastIndexOf(match[match.length - 1])
                let val
                if (isNaN(leftPart[leftIndex + 1])) {
                    val = parseInt(leftPart[leftIndex]) + parseInt(values[0])
                    leftPart = leftPart.substring(0, leftIndex) + val + leftPart.substring(leftIndex + 1);
                } else {
                    val = parseInt(leftPart[leftIndex] + leftPart[leftIndex + 1]) + parseInt(values[0])
                    leftPart = leftPart.substring(0, leftIndex) + val + leftPart.substring(leftIndex + 2);

                }
            }

            const rightIndex = rightPart.search(/\d+/g)
            if (rightIndex !== -1) {
                let val
                if (isNaN(rightPart[rightIndex + 1])) {
                    val = parseInt(rightPart[rightIndex]) + parseInt(values[1])
                    rightPart = rightPart.substring(0, rightIndex) + val + rightPart.substring(rightIndex + 1);
                } else {
                    val = parseInt(rightPart[rightIndex] + rightPart[rightIndex + 1]) + parseInt(values[1])
                    rightPart = rightPart.substring(0, rightIndex) + val + rightPart.substring(rightIndex + 2);
                }
            }
            str = leftPart + "0" + rightPart
            counter = 0
            i = -1
        }
        if (c === "]") counter--
    }
    return str
}

function split(str) {
    const index = str.search(/\d{2,}/g)
    if (index >= 0) {
        const nr = str.match(/\d{2,}/g).at(0)
        let leftValue = Math.floor(nr / 2)
        let rightValue = Math.ceil(nr / 2)
        return `${str.slice(0, index)}[${leftValue},${rightValue}]${str.slice(index + nr.length)}`
    }

    return str
}

function addLines(fst, snd) {
    let addition = `[${fst},${snd}]`
    while (true) {
        let newAddition = explode(addition)
        newAddition = split(newAddition)
        if (addition === newAddition) break;
        addition = newAddition
    }
    return addition
}

function magnitude(str) {
    while (true) {
        let index = str.search(/\[\d+,\d+\]/g)
        if (index === -1) break;
        const closeIndex = str.slice(index).indexOf("]")
        const values = str.substring(index + 1, index + closeIndex).split(",")
        const newValue = parseInt(values[0]) * 3 + parseInt(values[1]) * 2
        str = str.slice(0, index) + newValue + str.slice(index + closeIndex + 1)
    }
    return parseInt(str)
}

const head = numberList.shift()
const finalLine = numberList.reduce((a, b) => addLines(a, b), head)
const homeworkMagnitude = magnitude(finalLine)
// Answer part 1
console.log({ homeworkMagnitude });

// ##################### Part 2 #####################

numberList.push(head)

let largest = -1
numberList.forEach((termOne, i) => {
    numberList.forEach((termTwo, j) => {
        if (i !== j) {
            let resLine = addLines(termOne, termTwo)
            let resMagnitude = magnitude(resLine)
            if(resMagnitude > largest) largest = resMagnitude
        }
    })
})

console.log(largest);
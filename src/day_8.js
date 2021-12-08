//Might add more comments another day...

// ##################### Part 1 #####################

const fs = require('fs')
const content = fs.readFileSync(process.cwd() + "\\" + "day_8_data.txt").toString()
let test
//test = "acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf"
/*
Structure contentArr:
[ // each line (0)
    [ // left and right side of " | " (length == 2) (1)
        [ // split each string on spaces (2)
            [ // array with each letter in the string (3)
                g,e,b,a,e,c // for example
            ]
        ]
    ]
]
*/
const contentArr = (test ?? content)
    .split("\r\n")
    .map(row => row
        .split(" | ")
        .map(part => part
            .split(" ")
            .map(string => string
                .split(""))))

let counter = 0;
contentArr.forEach(line => {
    line[1] //right side of " | "
        .forEach(stringArr => {
            switch (stringArr.length) {
                case 2: case 3: case 4: case 7:
                    counter++
                    break
                default: break
            }
        }
        )
})

// Result part 1
console.log({ counter });

// ##################### Part 2 #####################
// The complexity is brutal... had to rub all my brain cells together for this one

let outputSum = 0
contentArr.forEach(line => {

    /*
      0
     xxxx
  1 x    x 2
    x    x
     xxxx 3
  4 x    x 5
    x    x
     xxxx
      6
    */

    const letters = Array(7)
    const signals = line[0] //left side of " | "

    const one = signals.filter(arr => arr.length === 2)[0]
    const three = signals.filter(arr => arr.length === 3)[0]
    const four = signals.filter(arr => arr.length === 4)[0]
    const eight = signals.filter(arr => arr.length === 7)[0]
    const twoThreeFive = signals.filter(arr => arr.length === 5)
    const zeroSixNine = signals.filter(arr => arr.length === 6)

    letters[0] = three.filter(x => !one.includes(x))[0];

    zeroSixNine.forEach(stringArr => {
        const res = eight.filter(x => !stringArr.includes(x))
            .filter(x => one.includes(x));
        if (res.length === 1) letters[2] = res[0]
    })

    zeroSixNine.forEach(stringArr => {
        const almostNine = [...four, letters[0]]
        const res = stringArr.filter(x => !almostNine.includes(x))
        if (res.length === 1) letters[6] = res[0]
    })

    letters[5] = one.filter(x => x !== letters[2])[0];

    twoThreeFive.forEach(stringArr => {
        const almostThree = [letters[0], letters[2], letters[5], letters[6]]
        const res = stringArr.filter(x => !almostThree.includes(x))
        if (res.length === 1) letters[3] = res[0]
    })

    letters[1] = four.filter(x => !letters.includes(x))[0];

    letters[4] = eight.filter(x => !letters.includes(x))[0];

    let segZero = new Set([letters[0], letters[1], letters[2], letters[4], letters[5], letters[6]])
    let segOne = new Set([letters[2], letters[5]])
    let segTwo = new Set([letters[0], letters[2], letters[3], letters[4], letters[6]])
    let segThree = new Set([letters[0], letters[2], letters[3], letters[5], letters[6]])
    let segFour = new Set([letters[1], letters[2], letters[3], letters[5]])
    let segFive = new Set([letters[0], letters[1], letters[3], letters[5], letters[6]])
    let segSix = new Set([letters[0], letters[1], letters[3], letters[4], letters[5], letters[6]])
    let segSeven = new Set([letters[0], letters[2], letters[5]])
    let segEight = new Set([letters[0], letters[1], letters[2], letters[3], letters[4], letters[5], letters[6]])
    let segNine = new Set([letters[0], letters[1], letters[2], letters[3], letters[5], letters[6]])

    let number = ""
    line[1].forEach(output => {
        const outputSeg = new Set(output)
    
        if (eqSet(outputSeg, segZero)) number += "0"
        if (eqSet(outputSeg, segOne)) number += "1"
        if (eqSet(outputSeg, segTwo)) number += "2"
        if (eqSet(outputSeg, segThree)) number += "3"
        if (eqSet(outputSeg, segFour)) number += "4"
        if (eqSet(outputSeg, segFive)) number += "5"
        if (eqSet(outputSeg, segSix)) number += "6"
        if (eqSet(outputSeg, segSeven)) number += "7"
        if (eqSet(outputSeg, segEight)) number += "8"
        if (eqSet(outputSeg, segNine)) number += "9"
    })
    outputSum += parseInt(number, 10)
})

function eqSet(as, bs) {
    if (as.size !== bs.size) return false;
    for (var a of as) if (!bs.has(a)) return false;
    return true;
}

// Result part 2
console.log({outputSum});
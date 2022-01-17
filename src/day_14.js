
// ##################### Part 1 #####################
const fs = require('fs')
const content = fs.readFileSync(process.cwd() + "\\" + "day_14_data.txt").toString()
const contentArr = content
    .split("\r\n\r\n")
    .map(part => part.split("\r\n"))

const initStr = contentArr[0][0].split("")
const insertionRules = new Map(contentArr[1].map(rule => rule.split(" -> ")))

let modArr = contentArr[0][0].split("")
for (let step = 0; step < 10; step++) {
    for (let c = 0; c < modArr.length - 1; c++) {
        const pair = modArr[c] + modArr[c + 1]
        const insert = insertionRules.get(pair)
        if (insert) {
            modArr.splice(c + 1, 0, insert)
            c++
        }
    }
}
const countMap = modArr.reduce((sum, curr) => {
    let val = sum.get(curr)
    sum.set(curr, val + 1)
    return sum
}, new Map(Array.from(new Set(modArr)).map(sym => [sym, 0])))

const sortedValues = Array.from(countMap.values()).sort((a,b) => a-b)
const step10 = sortedValues.at(-1) - sortedValues.at(0)

// Answer part 1
console.log({step10});

// ##################### Part 2 #####################
let modMap = new Map()
for (let i = 0; i < initStr.length - 1; i++) {
    let curr = modMap.get(initStr[i] + initStr[i + 1])
    modMap.set(initStr[i] + initStr[i + 1], curr ? curr + 1 : 1)
}

for (let step = 0; step < 40; step++) {
    let newMap = new Map()
    modMap.forEach((value, key) => {
        const [fst, snd] = key.split("")
        const insert = insertionRules.get(key)
        const currAmountFirst = newMap.get((fst + insert))
        newMap.set((fst + insert), currAmountFirst ? (currAmountFirst + value) : value)
        const currAmountSecond = newMap.get((insert + snd))
        newMap.set((insert + snd), currAmountSecond ? (currAmountSecond + value) : value)
    })
    modMap = newMap
}

let result = Object.create(null)
modMap.forEach((val, key) => {
    const [a, b] = key.split("")
    if (a in result) result[a] += val;
    else result[a] = val;
    if (b in result) result[b] += val;
    else result[b] = val;
})
result[initStr.at(0)] += 1
result[initStr.at(-1)] += 1
for (let vKey in result) result[vKey] /= 2;
const resArr = Object.values(result).sort((a, b) => a - b)
const step40 = resArr.at(-1) - resArr.at(0)

// Answer part 2
console.log({step40});
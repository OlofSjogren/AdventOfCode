// ##################### Part 1 & 2 #####################

const fs = require('fs')
const content = fs.readFileSync(process.cwd() + "\\" + "day_16_data.txt").toString()
const binaryStrings = content.split("").map(char => Number(parseInt(char, 16)).toString(2).padStart(4, "0")).join("")

let partOneString = binaryStrings.slice()

function parseLiteral(pStr) {
    let number = ""
    let count = 0
    while (true) {
        count++
        const prefix = parseInt(pStr.substring(0, 1), 2)
        pStr = pStr.slice(1)
        number += pStr.substring(0, 4)
        pStr = pStr.slice(4)
        if (!prefix) break;
    }
    return [parseInt(number, 2), pStr]
}

let parsedNumbers = ""
let totVer = 0
let finalValue = 0
function parsePackage(pStr, am,) {
    if (pStr.length === 0) return am - 1;
    const ver = parseInt(pStr.substring(0, 3), 2)
    totVer += ver
    const id = parseInt(pStr.substring(3, 6), 2)
    pStr = pStr.slice(6)
    if (id === 4) {
        const [number, newStr] = parseLiteral(pStr)
        parsedNumbers += (" " + number + " ")
        pStr = newStr
    } else {
        const lengthTypeId = parseInt(pStr.substring(0, 1), 2)
        pStr = pStr.slice(1)
        let startIndex
        if (lengthTypeId === 0) {
            const subBitLength = parseInt(pStr.substring(0, 15), 2)
            pStr = pStr.slice(15)
            let subPack = pStr.substring(0, subBitLength)
            pStr = pStr.slice(subBitLength)
            parsedNumbers += "("
            startIndex = parsedNumbers.length - 1
            while (subPack.length) {
                [newAm, newSub] = parsePackage(subPack, am)
                subPack = newSub
            }
        } else {
            let subPackLength = parseInt(pStr.substring(0, 11), 2)
            pStr = pStr.slice(11)
            parsedNumbers += "("
            startIndex = parsedNumbers.length - 1
            while (subPackLength) {
                [subPackLength, newStr] = parsePackage(pStr, subPackLength)
                pStr = newStr
            }
        }
        parsedNumbers = parsedNumbers.trim()
        let values = parsedNumbers.slice(startIndex + 1).trim().split(" ").filter(a => a.length > 0).map(x => +x)
        parsedNumbers = parsedNumbers.slice(0, startIndex)
        let res
        switch (id) {
            case 0:
                res = values.reduce((a, b) => a + b, 0)
                break;
            case 1:
                res = values.reduce((a, b) => a * b, 1)
                break;
            case 2:
                res = Math.min(...values)
                break;
            case 3:
                res = Math.max(...values)
                break;
            case 5:
                res = values[0] > values[1] ? 1 : 0
                break;
            case 6:
                res = values[0] < values[1] ? 1 : 0
                break;
            case 7:
                res = values[0] === values[1] ? 1 : 0
                break;
            default:
                break;
        }
        parsedNumbers += (" " + res)
    }
    return [am - 1, pStr]
}

parsePackage(partOneString, 0)

// Answer part 1
console.log({ totVer });

// Answer part 2
console.log({ parsedNumbers });


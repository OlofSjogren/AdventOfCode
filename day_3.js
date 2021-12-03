
// ##################### Part 1 #####################

const fs = require('fs')
const content = fs.readFileSync(process.cwd() + "/" + "day_3_data.txt").toString()
const contentArr = content.split("\r\n")

const totalBinaryStrings = contentArr.length;
const BINARY_LENGTH = contentArr[0].length;
const oneCounterArr = new Array(BINARY_LENGTH).fill(0)

contentArr.forEach(binStr => {
    const binArr = binStr.split("").map(e => parseInt(e)) // e.g. [1,0,1,0,1,0,1,0,1,0,1,0]
    for (let i = 0; i < binArr.length; i++) {
        oneCounterArr[i] += binArr[i]
    }
});

const gammaRateString = oneCounterArr
    .map(x => (x < totalBinaryStrings / 2 ? "0" : "1"))
    .join("")

const epsilonRateString = gammaRateString
    .replaceAll("0", "temp")
    .replaceAll("1", "0")
    .replaceAll("temp", "1")

const gammaRate = parseInt(gammaRateString, 2)
const epsilonRate = parseInt(epsilonRateString, 2)
const powerConsumption = gammaRate * epsilonRate


// ##################### Part 2 #####################

const arrOfBinArrs = contentArr.map(str => str.split("").map(e => parseInt(e)))

// Oxygen
let searchOxyArr = arrOfBinArrs
for (let i = 0; i < BINARY_LENGTH; i++) {
    let countOnes = searchOxyArr.reduce((acc, arr) => acc + arr[i], 0);
    let keep = (countOnes >= (searchOxyArr.length - countOnes)) ? 1 : 0;
    let filteredArr = searchOxyArr.filter(binArr => binArr[i] === keep)
    searchOxyArr = filteredArr
    if (searchOxyArr.length === 1) break;
}
const oxygenRating = parseInt(searchOxyArr[0].join(""), 2)
console.log("oxygenRating", oxygenRating);

// C02 Scrubber
let searchCoArr = arrOfBinArrs
for (let i = 0; i < BINARY_LENGTH; i++) {
    let countOnes = searchCoArr.reduce((acc, arr) => acc + arr[i], 0);
    let keep = (countOnes >= (searchCoArr.length - countOnes)) ? 0 : 1;
    let filteredArr = searchCoArr.filter(binArr => binArr[i] === keep)
    searchCoArr = filteredArr
    if (searchCoArr.length === 1) break;
}
const coRating = parseInt(searchCoArr[0].join(""), 2)
console.log("coRating", coRating);

console.log("lifeSupport", coRating * oxygenRating);
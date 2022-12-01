
// ##################### Part 1 #####################

const fs = require('fs')
const content = fs.readFileSync(process.cwd() + "\\" + "day_9_data.txt").toString()
const test = "2199943210\r\n3987894921\r\n9856789892\r\n8767896789\r\n9899965678"
const contentArr = content
    .split("\r\n")
    .map(row =>
        row.split("")
            .map(x => +x))

const HEIGHT = contentArr.length
const WIDTH = contentArr[0].length

function checkNeighbours(row, col) {
    const val = contentArr[row][col]
    return (
        (row + 1 < HEIGHT ? contentArr[row + 1][col] > val : true) &&
        (row - 1 >= 0 ? contentArr[row - 1][col] > val : true) &&
        (col + 1 < WIDTH ? contentArr[row][col + 1] > val : true) &&
        (col - 1 >= 0 ? contentArr[row][col - 1] > val : true)
    )
}

const basins = []
let riskLevel = 0
for (let row = 0; row < HEIGHT; row++) {
    for (let col = 0; col < WIDTH; col++) {
        if (checkNeighbours(row, col)) {
            riskLevel += (contentArr[row][col] + 1)
            basins.push({ row, col })
        }
    }
}

// Answer part 1
console.log("Part 1:",{ riskLevel });

// ##################### Part 2 #####################

function exploreBasin(row, col) {
    const frontier = [{ row, col }]
    let sizeCounter = 0
    while (frontier.length !== 0) {
        const { row, col } = frontier.pop();
        if (contentArr[row][col] !== 9) {
            sizeCounter++;
            contentArr[row][col] = 9;
            if (row + 1 < HEIGHT && contentArr[row + 1][col] !== 9)
                frontier.push({ row: row + 1, col })
            if (row - 1 > 0 && contentArr[row - 1][col] !== 9)
                frontier.push({ row: row - 1, col })
            if (col + 1 < WIDTH && contentArr[row][col + 1] !== 9)
                frontier.push({ row, col: col + 1 })
            if (col - 1 > 0 && contentArr[row][col - 1] !== 9)
                frontier.push({ row, col: col - 1 })
        }
    }
    return sizeCounter
}

const basinSizes = []
basins.forEach(cord => {
    const { row, col } = cord
    const bs = exploreBasin(row, col)
    basinSizes.push(bs)
})

basinSizes.sort((a, b) => b - a)
const threeLargestMultiplied = basinSizes[0] * basinSizes[1] * basinSizes[2]

// Answer part 2
console.log("Part 2:", { threeLargestMultiplied });
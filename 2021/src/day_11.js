
// ##################### Part 1 (& 2) #####################

const fs = require('fs')
const content = fs.readFileSync(process.cwd() + "\\" + "day_11_data.txt").toString()
const contentArr = content
    .split("\r\n")
    .map(row => row.split("").map(x => [+x, false]))

const HEIGHT = contentArr.length
const WIDTH = contentArr[0].length

let flashes = 0;

function flashAdjacent(row, col) {
    for (let r = Math.max(row - 1, 0); r < Math.min(HEIGHT, row + 2); r++) {
        for (let c = Math.max(col - 1, 0); c < Math.min(WIDTH, col + 2); c++) {
            if (!contentArr[r][c][1]) contentArr[r][c][0]++
            if (contentArr[r][c][0] === 10) {
                flashes++
                contentArr[r][c][0] = 0
                contentArr[r][c][1] = true
                flashAdjacent(r, c)
            }
        }
    }
}

for (let step = 1; step <= 308; step++) {
    contentArr.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            if (!contentArr[rowI][colI][1]) contentArr[rowI][colI][0]++;
            if (contentArr[rowI][colI][0] === 10) {
                flashes++
                contentArr[rowI][colI][0] = 0
                contentArr[rowI][colI][1] = true
                flashAdjacent(rowI, colI)
            }
        })
    })
    let sumOfAll = 0
    for (let i = 0; i < HEIGHT; i++) {
        for (let j = 0; j < WIDTH; j++) {
            sumOfAll += contentArr[i][j][0]
            contentArr[i][j][1] = false
        }
    }
    
    // Answer part 1
    if (step === 100) console.log({ flashes });

    // Answer part 2
    if (sumOfAll === 0) console.log({ step });
}


// ##################### Part 1 #####################

const fs = require('fs')
const content = fs.readFileSync(process.cwd() + "\\" + "day_15_data.txt").toString()
const matrix = content
    .split("\r\n")
    .map((line, row) => line.split("").map((x, col) => {
        return {
            row,
            col,
            val: +x,
            dist: Infinity,
            prev: undefined,
            v: false
        }
    }))

function getAdjacentLine(row, col, matrix) {
    const adj = []
    if (row + 1 < matrix.length && !matrix[row + 1]?.[col]?.v) adj.push(matrix[row + 1][col])
    if (row - 1 >= 0 && !matrix[row - 1]?.[col]?.v) adj.push(matrix[row - 1][col])
    if (col + 1 < matrix[0].length && !matrix[row]?.[col + 1]?.v) adj.push(matrix[row][col + 1])
    if (col - 1 >= 0 && !matrix[row]?.[col - 1]?.v) adj.push(matrix[row][col - 1])
    return adj
}

matrix[0][0].dist = 0
const pq = [matrix[0][0]]
let minDist = Infinity
while (pq.length) {
    const current = pq.shift()
    const { row, col, val, dist, prev } = current
    const adjacent = getAdjacentLine(row, col, matrix)
    if (row === matrix.length - 1 && col === matrix[0].length - 1) {
        minDist = dist
        break;
    }
    adjacent.forEach(neighbour => {
        neighbour.v = true
        neighbour.dist = dist + neighbour.val
        neighbour.prev = current
        pq.push(neighbour)
    })
    pq.sort((a, b) => a.dist - b.dist)
}

console.log(`--- Part 1 answer ---`);
console.log(`Path length: ${minDist}`);

// ##################### Part 2 #####################

const matrixFive = Array(matrix.length * 5).fill().map(() => Array(matrix[0].length * 5).fill())
for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[0].length; c++) {
        for (let i = 0; i < matrix.length * 5; i += matrix.length) {
            for (let j = 0; j < matrix[0].length * 5; j += matrix[0].length) {
                matrixFive[r + i][c + j] = { ...matrix[r][c] }
                matrixFive[r + i][c + j].dist = Infinity
                matrixFive[r + i][c + j].prev = undefined
                matrixFive[r + i][c + j].row = r + i
                matrixFive[r + i][c + j].col = c + j
                matrixFive[r + i][c + j].v = false
                let newValue = matrixFive[r + i][c + j].val + Math.floor(i/matrix.length) + Math.floor(j/matrix[0].length)
                if (newValue >= 10) matrixFive[r + i][c + j].val = (newValue % 10) + 1
                else matrixFive[r + i][c + j].val = newValue
            }
        }
    }
}

matrixFive[0][0].dist = 0
const pqFive = [matrixFive[0][0]]
let minDistFive = Infinity
while (pqFive.length) {
    const current = pqFive.shift()
    const { row, col, val, dist, prev } = current
    const adjacent = getAdjacentLine(row, col, matrixFive)
    if (row === matrixFive.length - 1 && col === matrixFive[0].length - 1) {
        minDistFive = dist
        break;
    }
    adjacent.forEach(neighbour => {
        neighbour.v = true
        neighbour.dist = dist + neighbour.val
        neighbour.prev = current
        pqFive.push(neighbour)
    })
    pqFive.sort((a, b) => a.dist - b.dist)
}

console.log(`--- Part 2 answer ---`);
console.log(`Path length: ${minDistFive}`);
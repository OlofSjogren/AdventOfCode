
// ##################### Part 1 #####################

const fs = require('fs')
const content = fs.readFileSync(process.cwd() + "/" + "day_5_data.txt").toString()

/*
Parse format: 
[
    { fromPoint: { x: 715, y: 620 }, toPoint: { x: 715, y: 633 } },
    { fromPoint: { x: 915, y: 385 }, toPoint: { x: 505, y: 385 } },
    ...
]
*/
const contentArr = content
    .split("\r\n")
    .map(line => {
        const fromToArr = line.split(" -> ")
        return {
            fromPoint: {
                x: parseInt(fromToArr[0].split(",")[0]),
                y: parseInt(fromToArr[0].split(",")[1])
            },
            toPoint: {
                x: parseInt(fromToArr[1].split(",")[0]),
                y: parseInt(fromToArr[1].split(",")[1])
            }
        }
    })

//Find the largest X and Y coordinate
let maxX = 0
let maxY = 0
contentArr.forEach(line => {
    line.fromPoint.x > maxX && (maxX = line.fromPoint.x)
    line.toPoint.x > maxX && (maxX = line.toPoint.x)
    line.fromPoint.y > maxY && (maxY = line.fromPoint.y)
    line.toPoint.y > maxY && (maxY = line.toPoint.y)
})

// Create maxX by maxY matrix representing diagram
const diagram = Array.from(Array(maxY + 1), _ => Array(maxX + 1).fill(0))

// Filter ut only the straight lines (no diagonals)
const straightLines = contentArr.filter(line =>
    line.fromPoint.x === line.toPoint.x ||
    line.fromPoint.y === line.toPoint.y
)

// Fills a straight line in the diagram, increments the cell
// in the diagram it crosses
function fillStraightLineInDiagram(line) {
    if (line.fromPoint.x === line.toPoint.x) {
        let x = line.fromPoint.x
        let fromY = Math.min(line.fromPoint.y, line.toPoint.y)
        let toY = Math.max(line.fromPoint.y, line.toPoint.y)
        for (let y = fromY; y <= toY; y++) {
            diagram[x][y] += 1
        }
    } else {
        let y = line.fromPoint.y
        let fromX = Math.min(line.fromPoint.x, line.toPoint.x)
        let toX = Math.max(line.fromPoint.x, line.toPoint.x)
        for (let x = fromX; x <= toX; x++) {
            diagram[x][y] += 1
        }
    }
}

// Fill all the straight lines
straightLines.forEach(line => {
    fillStraightLineInDiagram(line)
})

// Count the cells which are crossed by multiple lines, 
// i.e. contain a number higher than 1
let straightLineCounter = 0
for (let i = 0; i < diagram.length; i++) {
    for (let j = 0; j < diagram[i].length; j++) {
        if (2 <= diagram[i][j]) straightLineCounter++;
    }
}
// Part 1 result
console.log({ straightLineCounter });

// ##################### Part 2 #####################

// All the diagonal lines
const diagonalLines = contentArr.filter(line =>
    line.fromPoint.x !== line.toPoint.x &&
    line.fromPoint.y !== line.toPoint.y
)

// Not the prettiest solution...
// It's late and I can't be bothered
// Fills a diagonal line in the diagram, increments the cell
// in the diagram it crosses
function fillDiagonalLineInDiagram(line) {
    let x = line.fromPoint.x
    let y = line.fromPoint.y
    if (line.fromPoint.x < line.toPoint.x) {
        if (line.fromPoint.y < line.toPoint.y) {
            while (true) {
                if (x > line.toPoint.x) break;
                diagram[x][y] += 1
                x++;
                y++;
            }
        } else {
            while (true) {
                if (x > line.toPoint.x) break;
                diagram[x][y] += 1
                x++;
                y--;
            }
        }
    } else {
        if (line.fromPoint.y < line.toPoint.y) {
            while (true) {
                if (x < line.toPoint.x) break;
                diagram[x][y] += 1
                x--;
                y++;
            }
        } else {
            while (true) {
                if (x < line.toPoint.x) break;
                diagram[x][y] += 1
                x--;
                y--;
            }
        }
    }
}

// Fill all the diagonal lines
// Part 1 filled the straight lines, this is using the
// same (already filled) diagram from part 1
diagonalLines.forEach(line => {
    fillDiagonalLineInDiagram(line)
})

// Count the cells which are crossed by multiple lines 
// (both diagonal and straight), 
// i.e. contain a number higher than 1
let totalCounter = 0
for (let i = 0; i < diagram.length; i++) {
    for (let j = 0; j < diagram[i].length; j++) {
        if (2 <= diagram[i][j]) totalCounter++;
    }
}
// Part 2 result
console.log({ totalCounter });

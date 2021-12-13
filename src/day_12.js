
// ##################### Part 1 (& 2) #####################

const fs = require('fs')
const content = fs.readFileSync(process.cwd() + "\\" + "day_12_data.txt").toString()
const contentArr = content
    .split("\r\n")
    .map(row => row.split("-"))

const isUpperCase = (string) => /^[A-Z]/.test(string)
const findPaths = (node) => contentArr
    .filter(path => path[0] === node || path[1] === node)
    .map(path => path[0] === node ? path[1] : path[0])

let paths = []
const frontier = [["start"]]

while (frontier.length !== 0) {
    const onPath = frontier.pop()
    const on = onPath.at(-1)
    if (on === "end") {
        paths.push(onPath)
    } else {
        const adjacent = findPaths(on)
        adjacent.forEach(node => {
            if (node !== "start" && (isUpperCase(node) || !onPath.includes(node))) {
                frontier.push([...onPath, node])
            }
        })
    }
}

// Answer part 2
console.log(`Answer Part 1 | Number of paths: ${paths.length}`);

// ##################### Part 2 #####################
// Not the most efficient way to do it... takes about 4 seconds to calculate on my machine

const countSmallNodesVisitedTwice = path => {
    let smallNodes = path.filter(node => !isUpperCase(node))
    return smallNodes.length - (new Set(smallNodes)).size
}

let pathsPartTwo = 0
const frontierPartTwo = [[0, "start"]]

while (frontierPartTwo.length !== 0) {
    const onPath = frontierPartTwo.pop()
    const on = onPath.at(-1)
    if (on === "end") {
        pathsPartTwo++
    } else {
        const adjacent = findPaths(on)
        const countedSmallNodes = countSmallNodesVisitedTwice(onPath)
        adjacent.forEach(node => {
            if (node !== "start" && (isUpperCase(node) || countedSmallNodes < 2)) {
                frontierPartTwo.push([...onPath, node])
            }
        })
    }
}

// Answer part 2
console.log(`Answer Part 2 | Number of paths: ${pathsPartTwo}`);

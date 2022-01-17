// ##################### Part 1 #####################

const fs = require('fs')
const content = fs.readFileSync(process.cwd() + "\\" + "day_21_data.txt").toString().split("\r\n")

let p1Pos = parseInt(content[0].at(-1))
let p2Pos = parseInt(content[1].at(-1))
let pointP1 = 0
let pointP2 = 0

let detDice = 0
let diceRolls = 0

function rollDetDice() {
    diceRolls++
    detDice++
    detDice %= 101
    detDice === 0 && detDice++
    return detDice
}

function updatePos(pos, roll) {
    let newPos = pos + (roll % 10)
    if (newPos > 10) newPos -= 10
    return newPos
}

while (true) {
    let roll1 = rollDetDice() + rollDetDice() + rollDetDice()
    p1Pos = updatePos(p1Pos, roll1)
    pointP1 += p1Pos
    if (pointP1 >= 1000) break;

    let roll2 = rollDetDice() + rollDetDice() + rollDetDice()
    p2Pos = updatePos(p2Pos, roll2)
    pointP2 += p2Pos
    if (pointP2 >= 1000) break;
}

// Answer part 1
const resultPartOne = diceRolls * (pointP2 < pointP1 ? pointP2 : pointP1)
console.log({ resultPartOne });

// ##################### Part 2 #####################

const calculatedStates = new Map()
function splitRound(p1Pos, p1Points, p2Pos, p2Points) {
    const key = "" + p1Pos + " " + p1Points + " " + p2Pos + " " + p2Points
    let find = calculatedStates.get(key)
    if (p1Points >= 21) {
        calculatedStates.set(key, [1, 0])
        return [1, 0]
    }
    if (p2Points >= 21) {
        calculatedStates.set(key, [0, 1])
        return [0, 1]
    }
    if (find !== undefined) return find
    else {
        let totWins = [0, 0]
        for (let roll1 = 1; roll1 < 4; roll1++) {
            for (let roll2 = 1; roll2 < 4; roll2++) {
                for (let roll3 = 1; roll3 < 4; roll3++) {
                    const newPos = updatePos(p1Pos, roll1 + roll2 + roll3)
                    const [newp2Points, newp1Points] = splitRound(p2Pos, p2Points, newPos, p1Points + newPos)
                    totWins = [totWins[0] + newp1Points, totWins[1] + newp2Points]
                }
            }
        }
        calculatedStates.set(key, totWins)
        return totWins
    }
}

p1Pos = parseInt(content[0].at(-1))
p2Pos = parseInt(content[1].at(-1))

const [p1won, p2won] = splitRound(p1Pos, 0, p2Pos, 0)
const won = Math.max(p1won, p2won)
// Answer part 2
console.log({ won });

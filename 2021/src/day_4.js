// Honestly more complex than it needed to be...
// I just kept coding and it just kept working...

// ##################### Part 1 #####################

const fs = require('fs')
const content = fs.readFileSync(process.cwd() + "/" + "day_4_data.txt").toString()
const contentArr = content.replaceAll("  ", " ").split("\r\n\r\n")

const pointArr = contentArr[0].split(",").map(x => parseInt(x))

let boards = [];

// Create array of matrices representing bingo (i.e. 3d matrice => boards[][][])
//  list-v v-bingo-row
// boards[][][]
//            ^-bingo-col
// each bingo-cell is an object:
// {
//     value: Int,
//     checked: Bool (initially false)
// }
for (let i = 1; i < contentArr.length; i++) {
    let board = contentArr[i]
        .trim()
        .split("\r\n")
        .map(row => {
            const arr = row.trim().split(" ")
            return arr.map(x => {
                return {
                    value: parseInt(x),
                    checked: false
                }
            })
        })
    boards.push(board)
}

// Checks a board for bingo, i.e. a row of cell.checked == true
// or a whole column of cell.checked == true
// Returns true if the matrix "has a bingo", false if not
function checkBoard(bingoMatrix) {
    let bingo = false
    for (let i = 0; i < bingoMatrix.length; i++) {
        bingoMatrix[i].every(e => e.checked) && (bingo = true)
    }
    for (let i = 0; i < bingoMatrix.length; i++) {
        let colBingo = []
        for (let j = 0; j < bingoMatrix.length; j++) {
            colBingo.push(bingoMatrix[j][i].checked)
        }
        colBingo.every(e => e) && (bingo = true)
    }
    return bingo
}

// returns the first board "containing a bingo" in the global boards array
// otherwise returns null 
function findFirstBingoBoard() {
    for (let i = 0; i < boards.length; i++) {
        let bingoFound = checkBoard(boards[i])
        if (bingoFound) return boards[i]
    }
    return null
}

// Updates a bingo-boards with checked == true 
// if it matches the value provided in the argument
function updateBingoBoard(bingoMatrix, value) {
    for (let i = 0; i < bingoMatrix.length; i++) {
        for (let j = 0; j < bingoMatrix[i].length; j++) {
            if (bingoMatrix[i][j].value === value) {
                bingoMatrix[i][j].checked = true
            }
        }
    }
}

// calculates the sum of all non-marked squares multiplied with
// the last marked value
function result(board, lastMarked) {
    let sum = 0
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (!board[i][j].checked) sum += board[i][j].value
        }
    }
    console.log("sum:", sum);
    console.log("lastMarked:", lastMarked);
    return (sum * lastMarked)
}

// Result for part 1 here (only one of part 1 and part 2 can be ran at once)
/*
for (let i = 0; i < pointArr.length; i++) {
    for (let j = 0; j < boards.length; j++) {
        updateBingoBoard(boards[j], pointArr[i])
    }
    let won = findFirstBingoBoard()
    
    // Answer (it works!)
    if (won != null) {
        console.log("bingo:", result(won, pointArr[i]));
        break;
    }
}
*/


// ##################### Part 2 #####################
console.log("------------ PART 2 ------------");

// finds the last winning bingo-board by removing winning bingo-boards
// from the list until there is only one winning bingo board left which
// it returns. If the last winning one hasn't been determined, it returns null
function removeWinningBingoBoard() {
    for (let i = 0; i < boards.length; i++) {
        let bingoFound = checkBoard(boards[i])
        if (bingoFound) {
            console.log(boards.length);
            if (boards.length === 1) {
                return boards[0]
            } else {
                boards.splice(i,1)
            }
        }
    }
    return null
}

/*
// Result for part 2 here (only one of part 1 and part 2 can be ran at once)
for (let i = 0; i < pointArr.length; i++) {
    for (let j = 0; j < boards.length; j++) {
        updateBingoBoard(boards[j], pointArr[i])
    }
    let lastWon = removeWinningBingoBoard()
    
    // Answer (it works!)
    if (lastWon != null) {
        console.log("bingo:", result(lastWon, pointArr[i]));
        break;
    }
}
*/

// ##################### Part 1 #####################

const fs = require('fs')
const content = fs.readFileSync(process.cwd() + "\\" + "day_7_data.txt").toString()
const contentArr = content.split(",").map(x => +x)

const max = Math.max(...contentArr)
const min = Math.min(...contentArr)

/* For each horisontal position: calculate the total amount of fuel needed
   for each sub to reach that position and sum up the total amount of fuel.
   Search for the minimum amount of fuel needed.
*/
let minFuel = Infinity
for (let hPos = min; hPos <= max; hPos++) {
    const reqFuel = contentArr
        .map(x => Math.abs(x - hPos))
        .reduce((a, b) => a + b, 0)
    if (reqFuel < minFuel) minFuel = reqFuel
}

// Answer 1
console.log({ minFuel });

// ##################### Part 2 #####################

/* For each horisontal position: calculate the total amount of fuel needed
   for each sub to reach that position and sum up the total amount of fuel.
   For each step taken, fuel consumption increases. Amounts to sum of number 
   from 1 to the number of steps needed.
   Search for the minimum amount of fuel needed.
*/
let minFuelSecond = Infinity
for (let hPos = min; hPos <= max; hPos++) {
    const reqFuel = contentArr
        .map(x => {
            let n = Math.abs(x - hPos) // n = amount of steps needed to reach hPos
            return ((n * (n + 1)) / 2) // Credit to my man Gauss: S=n(n+1)/2
                                       // S = Sum of all numbers in [1 .. n]
        })
        .reduce((a, b) => a + b, 0)
    if (reqFuel < minFuelSecond) minFuelSecond = reqFuel
}

// Answer 2
console.log({ minFuelSecond });